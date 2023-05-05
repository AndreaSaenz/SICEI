pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('Run test cases') {
            steps {
                sh 'echo "Ejecutando test cases"'
                sh 'npm test'
            }
        }
        stage('Create Docker Image') {
            steps {
                sh 'docker image ls -a'
                sh '''
                branch=$(echo $GIT_BRANCH | cut -d'/' -f 2)
                docker build . -t sicei-$branch:1.0.0-$BUILD_NUMBER
                '''
                sh 'docker image ls -a'
            }
        }
        stage('Stop containers') {
            steps {
                sh 'docker container ls -a'
                sh '''
                branch=$(echo $GIT_BRANCH | cut -d'/' -f 2)
                running=$(docker ps --filter name=sicei-$branch* --filter status=running -aq)
                if [ -z $running]
                then 
                    #Print error message 
                    echo "No hay contenedores ejecutandose" 
                else 
                    #Se apagan los contenedores con el mismo nombre 
                    docker ps --filter name=sicei-$branch* --filter status=running -aq | xargs docker stop 
                fi 
                '''
            }
        }
        stage('Creating container') {
            steps {
                sh '''
                branch=$(echo $GIT_BRANCH | cut -d'/' -f 2)
                docker run -d -p 8080:8080 --name sicei-container sicei-$branch:1.0.0-$BUILD_NUMBER
                '''
                sh 'docker container ls -a'
                sh '''
                branch=$(echo $GIT_BRANCH | cut -d'/' -f 2)
                docker run -p 127.0.0.1:30$BUILD_NUMBER:3000 --name sicei-$branch-$BUILD_NUMBER -d sicei-$branch:1.0.0-$BUILD_NUMBER
                '''
                sh 'docker container ls -a'
                sh '''
                branch=$(echo $GIT_BRANCH | cut -d'/' -f 2)
                docker container start sicei-$branch-$BUILD_NUMBER
                '''
                sh 'docker container ls'
            }
            
        }
    }
}