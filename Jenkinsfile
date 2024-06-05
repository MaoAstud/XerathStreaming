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
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Run API Tests') {
            steps {
                sh 'newman run C:/Users/mao_a/OneDrive/Documentos/6to/desarrollo/xerath.postman_collection.json'
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            mail to: 'mnastudillo@puce.edu.ec',
                 subject: "Build Successful: ${currentBuild.fullDisplayName}",
                 body: "Good news! The build ${currentBuild.fullDisplayName} was successful."
        }
        failure {
            mail to: 'mnastudillo@puce.edu.ec',
                 subject: "Build Failed: ${currentBuild.fullDisplayName}",
                 body: "Something is wrong. The build ${currentBuild.fullDisplayName} failed. Please check Jenkins for more details."
        }
    }
}
