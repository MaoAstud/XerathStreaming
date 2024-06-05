pipeline {
    agent any

    environment {
        NODEJS_HOME = tool name: 'xerathApi' // Usa el nombre que configuraste en NodeJS Tool Configuration
        PATH = "${env.NODEJS_HOME}/bin:${env.PATH}"
    }

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
