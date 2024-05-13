pipeline {

  agent any

  tools {nodejs "nodejs-19"}

  stages {
    stage('Checkout source code') {
      steps {
        git(url: 'https://github.com/quangle232/appium-webdriverio.git',
        branch: 'main',
        credentialsId: '990cc9e7-dc83-4cbf-8259-1fe882167d48')
      }
    }

    stage('Installing Package') {
      steps {
        sh 'npm install'
      }
    }

    stage("Running automation test") {
      steps {
        catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
           sh "npm run android.browser"
        }
      }
    }

    stage('Publish Allure Report') {
        steps {
            script {
                allure([
                    includeProperties: false,
                    jdk: '',
                    properties: [],
                    reportBuildPolicy: 'ALWAYS',
                    results: [[path: 'allure-results']]
                ])
            }
        }
    }

  }

  post{
    always{
      cleanWs()
    }
  }
}
