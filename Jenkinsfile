pipeline {
    agent any

    stages {

        stage('Get Code') {
            steps {
                echo 'Getting code from GitHub...'
                checkout scm
            }
        }

        stage('Run App') {
            steps {
                echo 'Stopping old app...'
                sh 'docker compose down || true'

                echo 'Starting new app...'
                sh 'docker compose up --build -d'
            }
        }
    }

    post {

        success {
            echo 'App is running successfully 🚀'
        }

        failure {
            echo 'Something went wrong ❌'
        }
    }
}