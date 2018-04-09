# -*- coding: utf-8 -*-
# File: api.py 2017-06-15 for 192.168.1.163:5656
from flask import Flask
from flask_restful import Resource, Api, fields, marshal_with
from pyodbc import connect
from datetime import datetime, timedelta


app = Flask(__name__)
api = Api(app)

SERVER_name = '192.168.1.163'

# layout fields
AP_fields = {
    'id': fields.Integer,
    'date': fields.DateTime(dt_format='iso8601'),
    'Id_Number': fields.String,
    'PC_name': fields.String,
    'AP_version': fields.String(default='1.0')
}

AP_less_fields = {
    'date': fields.DateTime(dt_format='iso8601'),
    'Id_Number': fields.String,
    'PC_name': fields.String,
}

AP_record_fields = {  # for AP_record
    'date': fields.String,
    'data': fields.Nested(AP_fields)
}

AP_record_day_fields = {  # for AP_record_day
    'show_days': fields.Integer,
    'earliest_date': fields.String,
    'data': fields.Nested(AP_fields)
}

AP_record_range_fields = {  # for AP_record_day
    'date_start': fields.String,
    'date_end': fields.String,
    'data': fields.Nested(AP_less_fields)
}

Warning_list_fields = {
    'PC_name': fields.String,
    'Launch_Count': fields.Integer,
    'Running_Hour': fields.Integer(attribute='Running_SUM')
}

PC_Summary_fields = {  # for PC_summary
    'date': fields.String,
    'Warning_number': fields.Integer(default=0),
    'Warning_list': fields.Nested(Warning_list_fields)
}
###############################################################################
Mem_fields = {
    'id': fields.Integer,
    'UPL_Date': fields.DateTime(attribute='UPLDate', dt_format='iso8601'),
    'PC_name': fields.String(attribute='PCName'),
    'Flag': fields.String,
    'AP_Name': fields.String(attribute='APName'),
    'Mem_Load': fields.Integer(attribute='MemLoad', default=0)
}

Mem_record_fields = {  # for Cline_Mem
    'date': fields.String,
    'data': fields.List(fields.Nested(Mem_fields))
}
###############################################################################
Utiliza_fields = {
    'id': fields.Integer,
    'LastDate': fields.DateTime(dt_format='iso8601'),
    'PC_name': fields.String(attribute='PCName'),
    'CPU_Module': fields.String(attribute='CPUModule'),
    'CPU_Load': fields.String(attribute='CPULoad'),
    'CPU_Code': fields.Integer(attribute='CPUCode'),
    'CPU_LogicaCode': fields.Integer(attribute='CPULogicaCode', default=0),
    'RAM_Load': fields.Integer(attribute='RAMLoad', default=0),
    'Total_RAM': fields.Integer(attribute='TotalRAM', default=0)
}

Utiliza_record_fields = {  # for Cline_Utiliza
    'date': fields.String,
    'data': fields.List(fields.Nested(Utiliza_fields))
}
###############################################################################
repair_fields = {
    'ID': fields.Integer,
    'RC_Date': fields.DateTime(dt_format='iso8601'),
    'NewCase': fields.Integer,
    'CloseCase': fields.Integer,
    'QueueCase': fields.Integer
}

temp_record_fields = {
    'show_days': fields.Integer,
    'data': fields.Nested(repair_fields)
}
###############################################################################
Dought1_fields = {
    'name': fields.String(attribute='XXXX'),
    'value': fields.Integer
}

Dought2_fields = {
    'name': fields.String,
    'value': fields.Integer
}

Dought3_fields = {
    'name': fields.String(attribute='XXXX'),
    'value': fields.Integer
}


def get_conn(dbname):
    conn = connect(
        r'DRIVER={ODBC Driver 11 for SQL Server};'
        # r'SERVER=localhost;'
        r'SERVER='+SERVER_name+r';'
        r'DATABASE='+dbname+r';'
        r'UID=jerry;'
        r'PWD=esuns29994889'
        )
    cursor = conn.cursor()
    return conn, cursor


def execute_sql(cursor):
    columns = [column[0] for column in cursor.description]
    # print 'columns', columns
    results = []
    for row in cursor.fetchall():
        results.append(dict(zip(columns, row)))
    return results


def get_today(N):
    N_days_ago = datetime.now() - timedelta(days=N)
    return datetime.now().strftime("%Y-%m-%d"), N_days_ago.strftime("%Y-%m-%d")


class status(Resource):
    def get(self):
        response = [
            'API is running OK',
            '/ : API server\'s status and description',
            '',
            '### table [AP_Record] ###',
            '/AP_record : Shows AP_Record today\'s data',
            '/AP_record/<day_num> : Shows the data for <day_num> days (to last day)',
            '/AP_record/range/<day_range> : Shows the data filter by range (from date selecter)',
            '/PC_Summary : Show last day\'s summary',
            '',
            '### table [Cline_Mem_Max10_AP] ###',
            '/Cline_Mem : Shows Cline_Mem_Max10_AP last day\'s data',
            '',
            '### table [Cline_Utilization] ###',
            '/Cline_Utiliza : Shows Cline_Utilization last day\'s data',
            '/CPU_Warning : Shows [PCName],[OVER_50_Count],[Running_Time] use table [CPU_Summary]',
            '/CPU_Summary : Shows [CPULoad]*3,[RAMLoad]*3 use table [CPU_Summary]',
            '',
            '### table [Repair_Case] ###',
            '/Reapir_Case/<day_num> : Show Reapir_Case for <day_num> days (to today, 1 record/day)',
            '',
            '### tile\'s data ###',
            '/CPU_Warning_tile : Data for CPU_Warning_tile',
            '',
            '### chart\'s data ###',
            '/Dought1_data : Data for id=echart_donut_1 [Top Processes]',
            '/Dought2_data : Data for id=echart_donut_2 [Restart Count]',
            '/Dought3_data : Data for id=echart_donut_3 [CPU Rate]',
            '/Dought4_data : Data for id=echart_donut_4 [Running Hours]'
            # '',
            # '### table [ServerRoom_Temperature] ###',
            # '/Temp_record :Show ServerRoom_Temperature data'
        ]
        return response


#table [Esuns_Collector_Data].[dbo].[AP_Record]
class AP_record(Resource):
    @marshal_with(AP_record_fields)
    def get(self):
        today, ago = get_today(1)

        conn, cursor = get_conn('Esuns_Collector_Data')
        sql = "SELECT [id],[date],[Id_Number],[PC_name],[AP_version] FROM [Esuns_Collector_Data].[dbo].[AP_Record] WHERE [date] > '" + today + "'"
        # sql = "SELECT [id],[date],[Id_Number],[PC_name],[AP_version] FROM [Esuns_Collector_Data].[dbo].[AP_Record] WHERE [date] > '2017-05-31'"
        cursor.execute(sql)
        result = execute_sql(cursor)

        response = {"date": ago}
        response["data"] = result

        cursor.close()
        conn.close()
        return response


class AP_record_day(Resource):
    @marshal_with(AP_record_day_fields)
    def get(self, day_num):
        conn, cursor = get_conn('Esuns_Collector_Data')

        today, ago = get_today(int(day_num))
        sql = "SELECT [id],[date],[Id_Number],[PC_name],[AP_version] FROM [Esuns_Collector_Data].[dbo].[AP_Record] WHERE [date] > '" + str(ago) + "'"

        cursor.execute(sql)
        result = execute_sql(cursor)

        response = {"show_days": day_num, "earliest_date": ago}
        response["data"] = result

        cursor.close()
        conn.close()
        return response


class AP_record_range_day(Resource):
    @marshal_with(AP_record_range_fields)
    def get(self, day_range):
        conn, cursor = get_conn('Esuns_Collector_Data')

        # print 'XXXX day_range: ', day_range

        date_start = day_range[0:4]+'-'+day_range[4:6]+'-'+day_range[6:8]
        date_end = day_range[9:13]+'-'+day_range[13:15]+'-'+day_range[15:17]
        date_end1 = datetime.strptime(date_end, "%Y-%m-%d")
        date_end1 = date_end1 + timedelta(days=1)
        date_end1 = datetime.strftime(date_end1, "%Y-%m-%d")

        sql = "SELECT [date],[Id_Number],[PC_name] FROM [Esuns_Collector_Data].[dbo].[AP_Record] WHERE [date] > '"+date_start+"' AND [date] < '"+date_end1+"'"
        cursor.execute(sql)
        result = execute_sql(cursor)

        response = {"date_start": date_start, "date_end": date_end}
        response["data"] = result

        cursor.close()
        conn.close()
        return response


class PC_Summary(Resource):
    @marshal_with(PC_Summary_fields)
    def get(self):
        today, ago = get_today(1)

        conn, cursor = get_conn('Esuns_Collector_Data')
        sql = "SELECT [PC_name],[Launch_Count],[Running_SUM] FROM [Esuns_Collector_Data].[dbo].[PC_Summary] ORDER BY [Launch_Count] DESC, [Running_SUM] DESC"
        cursor.execute(sql)
        result = execute_sql(cursor)

        sql = "SELECT count(*) FROM [Esuns_Collector_Data].[dbo].[PC_Summary] WHERE [Launch_Count] >= 4"
        cursor.execute(sql)
        Warning_number = execute_sql(cursor)
        Warning_number = Warning_number[0]['']
        # print "Warning_number: ", Warning_number

        cursor.close()
        conn.close()

        response = {"date": ago, "Warning_number": Warning_number}
        response["Warning_list"] = result
        return response


# view [CPU_Over_Count]
class CPU_Over_Count(Resource):
    def get(self):

        conn, cursor = get_conn('Esuns_Collector_Data')
        sql = "SELECT [PCName],[CPU_Over_Count],[Max_CPULoad],[Avg_CPULoad],[Min_CPULoad] FROM [Esuns_Collector_Data].[dbo].[CPU_OVER_Count] ORDER BY [Max_CPULoad] DESC"
        cursor.execute(sql)
        result = execute_sql(cursor)

        sql = "SELECT count(*) FROM [Esuns_Collector_Data].[dbo].[CPU_Over_Count] WHERE [CPU_Over_Count] >= 2"
        cursor.execute(sql)
        CPU_Warning_number = execute_sql(cursor)
        CPU_Warning_number = CPU_Warning_number[0]['']
        # print "CPU_Warning_number: ", CPU_Warning_number

        cursor.close()
        conn.close()

        response = {"CPU_Warning_number": 5}
        response["CPU_Warning_list"] = result
        return response


# table [Esuns_Collector_Data].[dbo].[Cline_Mem_Max10_AP]
class Cline_Mem(Resource):
    @marshal_with(Mem_record_fields)
    def get(self):
        today, ago = get_today(1)

        conn, cursor = get_conn('Esuns_Collector_Data')
        sql = "SELECT [id],[UPLDate],[PCName],[Flag],[APName],[MemLoad] FROM [Esuns_Collector_Data].[dbo].[Cline_Mem_Max10_AP] WHERE [UPLDate] > '" + str(ago) + "'"
        cursor.execute(sql)
        result = execute_sql(cursor)

        response = {"date": ago}
        response["data"] = result

        cursor.close()
        conn.close()
        return response


# table [Esuns_Collector_Data].[dbo].[Cline_Utilization]
class Cline_Utiliza(Resource):
    @marshal_with(Utiliza_record_fields)
    def get(self):
        today, ago = get_today(0)

        conn, cursor = get_conn('Esuns_Collector_Data')
        # 配合資料更新速度，抓前一天
        sql = "SELECT [id],[LastDate],[PCName],[CPUModule],[CPULoad],[CPUCode],[CPULogicaCode],[RAMLoad],[TotalRAM] FROM [Esuns_Collector_Data].[dbo].[Cline_Utilization] WHERE [LastDate] < DATEADD(DAY,  DATEDIFF(DAY,0,GETDATE()) ,0) AND [LastDate] > DATEADD(DAY,  DATEDIFF(DAY,1,GETDATE()) ,0)"
        cursor.execute(sql)
        result = execute_sql(cursor)

        response = {"date": ago}
        response["data"] = result

        cursor.close()
        conn.close()
        return response


# table [Esuns_Collector_Data].[dbo].[CPU_Summary]
class CPU_Warning(Resource):
    def get(self):
        today, ago = get_today(0)

        conn, cursor = get_conn('Esuns_Collector_Data')
        # 資料為前一天資料  [PCName],[OVER_50_Count],[Running_Time]
        sql = "SELECT [PCName],[OVER_50_Count],[Running_Time] FROM [Esuns_Collector_Data].[dbo].[CPU_Summary] WHERE [OVER_50_Count] >= 2"
        cursor.execute(sql)
        result = execute_sql(cursor)

        cursor.close()
        conn.close()
        return result

######
# table [Esuns_Collector_Data].[dbo].[CPU_Summary]
class CPU_Summary(Resource):
    def get(self):
        today, ago = get_today(0)

        conn, cursor = get_conn('Esuns_Collector_Data')
        # 資料為前一天資料  [PCName],[OVER_50_Count],[Running_Time]
        sql = "SELECT TOP 5 * FROM [Esuns_Collector_Data].[dbo].[CPU_Summary] ORDER BY [OVER_50_Count] DESC,[MAX_CPULoad] DESC"
        cursor.execute(sql)
        result = execute_sql(cursor)
        #############
        sql = "SELECT [PC_name],[ALL_DAY_COUNT] FROM [Esuns_Collector_Data].[dbo].[CPUWARN_ALL_DAY_COUNT]"
        cursor.execute(sql)
        result2 = execute_sql(cursor)
        #############
        for ele in result:
            for elee in result2:
                if ele['PCName'] == elee['PC_name']:
                    ele['ALL_DAY_COUNT'] = elee['ALL_DAY_COUNT']
        #############

        cursor.close()
        conn.close()
        return result


# table [Esuns_Collector_Data].[dbo].[Repair_Case]
class Reapir_Case_Day(Resource):
    @marshal_with(temp_record_fields)
    def get(self, day_num):
        conn, cursor = get_conn('Esuns_Collector_Data')

        conn, cursor = get_conn('Esuns_Collector_Data')
        sql = "SELECT TOP "+day_num+" [ID],[RC_Date],[NewCase],[CloseCase],[QueueCase] FROM [Esuns_Collector_Data].[dbo].[Repair_Case] ORDER BY [RC_Date] DESC"
        cursor.execute(sql)
        result = execute_sql(cursor)

        response = {"show_days": day_num}
        response["data"] = result

        cursor.close()
        conn.close()
        return response


############################################
# table [Esuns_Collector_Data].[dbo].[Repair_Case]
class CPU_Warning_tile(Resource):
    def get(self):
        conn, cursor = get_conn('Esuns_Collector_Data')
        sql = "SELECT COUNT(*) AS Warning_number FROM [Esuns_Collector_Data].[dbo].[CPU_Summary] WHERE [OVER_50_Count] >= 2"
        cursor.execute(sql)
        result = execute_sql(cursor)

        cursor.close()
        conn.close()
        return result
############################################


# Dought1_data //Top Processes
class Dought1_data(Resource):
    def get(self):

        conn, cursor = get_conn('Esuns_Collector_Data')
        sql = "SELECT [APName],[All_DAY_MAX_MemLoad] FROM [Esuns_Collector_Data].[dbo].[All_DAY_MAX_MemLoad_Process] ORDER BY [All_DAY_MAX_MemLoad] DESC"
        cursor.execute(sql)
        result = execute_sql(cursor)

        data = [{'name': result[0]['APName'], 'value': result[0]['All_DAY_MAX_MemLoad']},
                {'name': result[1]['APName'], 'value': result[1]['All_DAY_MAX_MemLoad']},
                {'name': result[2]['APName'], 'value': result[2]['All_DAY_MAX_MemLoad']},
                {'name': result[3]['APName'], 'value': result[3]['All_DAY_MAX_MemLoad']},
                {'name': result[4]['APName'], 'value': result[4]['All_DAY_MAX_MemLoad']},
                {'name': result[5]['APName'], 'value': result[5]['All_DAY_MAX_MemLoad']},
                {'name': result[6]['APName'], 'value': result[6]['All_DAY_MAX_MemLoad']},
                {'name': result[7]['APName'], 'value': result[7]['All_DAY_MAX_MemLoad']},
                {'name': result[8]['APName'], 'value': result[8]['All_DAY_MAX_MemLoad']},
                {'name': result[9]['APName'], 'value': result[9]['All_DAY_MAX_MemLoad']}
                ]

        cursor.close()
        conn.close()
        return data


# Dought2_data
class Dought2_data(Resource):
    @marshal_with(Dought2_fields)
    def get(self):

        conn, cursor = get_conn('Esuns_Collector_Data')
        sql = "SELECT [PC_name] ,[Launch_Count] FROM [Esuns_Collector_Data].[dbo].[AP_Summary]"
        cursor.execute(sql)
        result_raw = execute_sql(cursor)
        classA = 0  # 8 ~
        classB = 0  # 5 ~ 7
        classC = 0  # 2 ~ 4
        classD = 0  # 1
        count = 0
        for ele in result_raw:
            count += 1
            if ele['Launch_Count'] >= 8:
                classA += 1
            elif ele['Launch_Count'] >= 4 and ele['Launch_Count'] < 8:
                classB += 1
            elif ele['Launch_Count'] >= 2 and ele['Launch_Count'] < 4:
                classC += 1
            elif ele['Launch_Count'] == 1:
                classD += 1
            else:
                pass
        # print 'count: ', count, ' classA: ', classA, ' classB: ', classB, ' classC: ', classC, ' classD: ', classD

        data = [{'name': 'classA', 'value': classA},
                {'name': 'classB', 'value': classB},
                {'name': 'classC', 'value': classC},
                {'name': 'classD', 'value': classD}
                ]

        cursor.close()
        conn.close()
        return data


# Dought3_data ###
class Dought3_data(Resource):
    def get(self):

        conn, cursor = get_conn('Esuns_Collector_Data')
        sql = "SELECT [PCName],[MAX_CPULoad],[MIN_CPULoad],[AVG_CPULoad],[MAX_RAMLoad],[MIN_RAMLoad],[AVG_RAMLoad] FROM [Esuns_Collector_Data].[dbo].[CPU_Summary]"
        cursor.execute(sql)
        result_raw = execute_sql(cursor)
        classA = 0  # 80 ~
        classB = 0  # 50 ~ 79
        classC = 0  # 25 ~ 49
        classD = 0  # ~ 24
        count = 0
        for ele in result_raw:
            count += 1
            if ele['MAX_CPULoad'] >= 80:
                classA += 1
            elif ele['MAX_CPULoad'] >= 50 and ele['MAX_CPULoad'] < 80:
                classB += 1
            elif ele['MAX_CPULoad'] >= 25 and ele['MAX_CPULoad'] < 50:
                classC += 1
            elif ele['MAX_CPULoad'] < 25:
                classD += 1
            else:
                print 'something starnge: ', ele['MAX_CPULoad']
        # print 'count: ', count, ' classA: ', classA, ' classB: ', classB, ' classC: ', classC, ' classD: ', classD

        data = [{'name': 'classA', 'value': classA},
                {'name': 'classB', 'value': classB},
                {'name': 'classC', 'value': classC},
                {'name': 'classD', 'value': classD}
                ]

        cursor.close()
        conn.close()
        return data


# Dought4_data
class Dought4_data(Resource):
    def get(self):

        conn, cursor = get_conn('Esuns_Collector_Data')
        sql = "SELECT [PCName],[running_SUM] FROM [Esuns_Collector_Data].[dbo].[PC_runtime]"
        cursor.execute(sql)
        result_raw = execute_sql(cursor)
        classA = 0  # 12 ~
        classB = 0  # 8 ~ 12
        classC = 0  # 4 ~ 8
        classD = 0  # ~ 4
        count = 0
        for ele in result_raw:
            count += 1
            total_hour = ele['running_SUM']/60
            if total_hour >= 12:
                classA += 1
            elif total_hour >= 8 and total_hour < 12:
                classB += 1
            elif total_hour >= 5 and total_hour < 8:
                classC += 1
            elif total_hour <= 4:
                classD += 1
            else:
                pass
        # print 'count: ', count, ' classA: ', classA, ' classB: ', classB, ' classC: ', classC, ' classD: ', classD

        data = [{'name': 'classA', 'value': classA},
                {'name': 'classB', 'value': classB},
                {'name': 'classC', 'value': classC},
                {'name': 'classD', 'value': classD}
                ]

        cursor.close()
        conn.close()
        return data


api.add_resource(status, '/')  # API server's status
###############################################################################
api.add_resource(AP_record, '/AP_record')  # Shows AP_Record today's data
api.add_resource(AP_record_day, '/AP_record/<day_num>')  # Shows the data for # days
api.add_resource(AP_record_range_day, '/AP_record/range/<day_range>')  # Shows the data filter by range
api.add_resource(PC_Summary, '/PC_Summary')  # Show last day's PC summary
###############################################################################
api.add_resource(Cline_Mem, '/Cline_Mem')  # Shows Cline_Utilization today's data
###############################################################################
api.add_resource(Cline_Utiliza, '/Cline_Utiliza')  # Shows Cline_Utilization today\'s data
api.add_resource(CPU_Warning, '/CPU_Warning')  # Shows [PCName],[OVER_50_Count],[Running_Time] use table [CPU_Summary]
api.add_resource(CPU_Summary, '/CPU_Summary')  # Shows [CPULoad]*3,[RAMLoad]*3 use table [CPU_Summary]
###############################################################################
api.add_resource(Reapir_Case_Day, '/Reapir_Case/<day_num>')  # Shows Reapir_Case latest <day_num> days (1 record/day)
###############################################################################
api.add_resource(CPU_Warning_tile, '/CPU_Warning_tile')  #CPU_Warning_tile
###############################################################################
api.add_resource(Dought1_data, '/Dought1_data')  # Data for id=echart_donut_1 [Top Processes]
api.add_resource(Dought2_data, '/Dought2_data')  # Data for id=echart_donut_2 [Restart Count]
api.add_resource(Dought3_data, '/Dought3_data')  # Data for id=echart_donut_3 [CPU Rate]
api.add_resource(Dought4_data, '/Dought4_data')  # Data for id=echart_donut_4 [Running Hours]

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5656, debug=False)
    # app.run(port=5656, debug=True)
