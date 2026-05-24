pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build and Deploy Full-Stack Services') {
            steps {
                echo 'Deploying Notes App Services (Frontend, Backend, MySQL) using Docker Compose...'
                // Spin down old services (if any) and rebuild images to apply code changes
                sh 'docker compose down || true'
                echo 'old Docker stopped and again new docker build started'
                sh 'docker compose up --build -d'
            }
        }
    }

    post {
        success {
            echo 'Deployment Successful 🚀'
        }

        failure {
            echo 'Deployment Failed ❌'
        }
    }
}