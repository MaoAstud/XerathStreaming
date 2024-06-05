pipeline {
    agent any

    

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/MaoAstud/XerathStreaming'
            }
        }
        stage('Print Working Directory') {
            steps {
                sh 'pwd'
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
