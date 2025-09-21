pipeline {
  agent any
    tools {
    nodejs "NodeJS_18"   
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
      steps { 
        withCredentials([string(credentialsId: 'RENDER_HOOK_URL', variable: 'HOOK')]) {
          sh 'curl -X POST "$HOOK"'
        }
      }
    }
  }
}
