# -*- coding: utf-8 -*-
from flask import Flask
from flask_restful import Resource, Api, fields, marshal_with
from pyodbc import connect
from datetime import datetime, timedelta


app = Flask(__name__)
api = Api(app)

# layout fields
AI_fields = {
    'eq_id': fields.String,
    'fun_type': fields.String,
    'record_time': fields.DateTime(dt_format='iso8601'),
    'value_int': fields.Integer,
    'is_delete': fields.Integer(default='0')
}

AI_record_fields = {  # for AP_record
    'today': fields.String,
    'ago': fields.String,
    'data': fields.Nested(AI_fields)
}

EQ_fields = {
    'eq_id': fields.String,
    'record_date': fields.DateTime(dt_format='iso8601'),
    'hour0_kwh': fields.Integer,
    'hour1_kwh': fields.Integer,
    'hour2_kwh': fields.Integer,
    'hour3_kwh': fields.Integer,
    'hour4_kwh': fields.Integer,
    'hour5_kwh': fields.Integer,
    'hour6_kwh': fields.Integer,
    'hour7_kwh': fields.Integer,
    'hour8_kwh': fields.Integer,
    'hour9_kwh': fields.Integer,
    'hour10_kwh': fields.Integer,
    'hour11_kwh': fields.Integer,
    'hour12_kwh': fields.Integer,
    'hour13_kwh': fields.Integer,
    'hour14_kwh': fields.Integer,
    'hour15_kwh': fields.Integer,
    'hour16_kwh': fields.Integer,
    'hour17_kwh': fields.Integer,
    'hour18_kwh': fields.Integer,
    'hour19_kwh': fields.Integer,
    'hour20_kwh': fields.Integer,
    'hour21_kwh': fields.Integer,
    'hour22_kwh': fields.Integer,
    'hour23_kwh': fields.Integer,
    'hour24_kwh': fields.Integer,
    'protect': fields.Integer(default='0')
}

EQ_record_fields = {  # for AP_record
    'today': fields.String,
    'ago': fields.String,
    'data': fields.Nested(EQ_fields)
}

def get_conn(dbname):
    conn = connect(
        r'DRIVER={ODBC Driver 13 for SQL Server};'
        r'SERVER=localhost;'
        r'DATABASE='+dbname+r';'
        r'Trusted_Connection=yes'
        )
    cursor = conn.cursor()
    return conn, cursor


def execute_sql(cursor):
    columns = [column[0] for column in cursor.description]
    print 'columns', columns
    results = []
    for row in cursor.fetchall():
        results.append(dict(zip(columns, row)))
    return results


def get_today(N):
    N_days_ago = datetime.now() - timedelta(days=N)
    return datetime.now().strftime("%Y-%m-%d"), N_days_ago.strftime("%Y-%m-%d")

##########################################
class status(Resource):
    def get(self):
        response = [
            'API is running OK',
            '/ :API server\'s status',
            '',
            '/AI_record',
            '/EQ_kwh',
            ''
        ]
        return response


##table [siemens_ai_record] ##
class AI_record(Resource):
    @marshal_with(AI_record_fields)
    def get(self):
        today, ago = get_today(0)

        conn, cursor = get_conn('jg')
        sql = "SELECT [eq_id],[fun_type],[record_time],[value_int],[is_delete] FROM [jg].[afm].[siemens_ai_record] WHERE [record_time] > '2017-06-01' ORDER BY [record_time] DESC"
        cursor.execute(sql)
        result = execute_sql(cursor)

        response = {"today": today, "ago": ago}
        response["data"] = result

        cursor.close()
        conn.close()
        return response


##table [siemens_eq_kwh] ##
class EQ_kwh(Resource):
    @marshal_with(EQ_record_fields)
    def get(self):
        today, ago = get_today(0)

        conn, cursor = get_conn('jg')
        sql = "SELECT * FROM [jg].[afm].[siemens_eq_kwh] WHERE [record_date] > '2017-06-06'"
        cursor.execute(sql)
        result = execute_sql(cursor)

        response = {"today": today, "ago": ago}
        response["data"] = result

        cursor.close()
        conn.close()
        return response

api.add_resource(status, '/')  # API server's status
api.add_resource(AI_record, '/AI_record')  # API server's status
api.add_resource(EQ_kwh, '/EQ_kwh')  # API server's status

if __name__ == '__main__':
    app.run(debug=True)
