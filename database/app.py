from init import *
from resourses import UserResource, ProjectResource, LoginResource
from flask.cli import FlaskGroup

api.add_resource(ProjectResource, '/projects', '/projects/<int:project_id>')
api.add_resource(UserResource, '/users')
api.add_resource(LoginResource, '/login')


def initialize_db():
    with app.app_context():
        db.create_all()


if __name__ == '__main__':
    initialize_db()
    app.run(host='0.0.0.0', port=5000, debug=True)
