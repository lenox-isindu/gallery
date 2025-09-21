pipeline {
  agent any
  tools {
    nodejs "NodeJS_18"
  }

  environment {
    RENDER_URL = "https://gallery-vvrp.onrender.com/"
  }

  stages {
    stage('Checkout') {
      steps {
        git branch: 'master', url: 'https://github.com/lenox-isindu/gallery.git'
      }
    }
    stage('Install') {
      steps {
        sh 'npm install'
      }
    }
    stage('Run Tests') {
      steps {
        sh 'npm test'
      }
    }
    stage('Deploy to Render') {
      when {
        expression { currentBuild.currentResult == 'SUCCESS' }
      }
      steps {
        withCredentials([string(credentialsId: 'RENDER_HOOK_URL', variable: 'HOOK')]) {
          sh 'curl -X POST "$HOOK"'
        }
      }
    }
  }

  post {
    success {
      emailext(
        subject: "Jenkins Build SUCCESS: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
        body: """
          <p>Your build <b>${env.JOB_NAME} #${env.BUILD_NUMBER}</b> passed all tests.</p>
          <p>Deployed to Render successfully</p>
          <p><a href="${env.BUILD_URL}">View Jenkins Job</a></p>
        """,
        recipientProviders: [[$class: 'DevelopersRecipientProvider']],
        to: "lenox1739@gmail.com"
      )

      slackSend(
        channel: '#Lenox_IP1',
        color: 'good',
        message: "Build #${env.BUILD_NUMBER} deployed successfully. Visit site: ${env.RENDER_URL}"
      )
    }

    failure {
      emailext(
        subject: "Jenkins Build FAILED: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
        body: """
          <p>Your build <b>${env.JOB_NAME} #${env.BUILD_NUMBER}</b> failed.</p>
          <p>Check the <a href="${env.BUILD_URL}console">console log</a> for details.</p>
        """,
        recipientProviders: [[$class: 'DevelopersRecipientProvider']],
        to: "lenox1739@gmail.com"
      )

      slackSend(
        channel: '#Lenox_IP1',
        color: 'danger',
        message: "Build #${env.BUILD_NUMBER} failed. Check logs: ${env.BUILD_URL}"
      )
    }
  }
}
