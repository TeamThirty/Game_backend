from init import *
from resourses import UserResource, ProjectResource, LoginResource


def initialize_db():
    with app.app_context():
        db.create_all()


api.add_resource(ProjectResource, '/projects', '/projects/<int:projectId>')
api.add_resource(UserResource, '/users')
api.add_resource(LoginResource, '/login')

if __name__ == '__main__':
    initialize_db()
    app.run(host='0.0.0.0', port=5000, debug=True)
