# React app

Stack

    React 18

    Typescript 4.7

    Node 14+


Local development

    yarn install
    yarn dev

Generate car list

    yarn build-car-list

Deploy to aws
    
    Ask your aws account administrator to provide you with

        Access key ID
        Secret access key

    Setup aws cdk (need only ones)

        # if you don't have aws cli installed
        brew install awscli 
        
        # if you don't have aws-cdk installed, install cdk on global level
        yarn add global aws-cdk
        
        # region: eu-west-1, format: json
        aws configure 
   
    Deploy to aws
        
        change serviceName in deploy/bin/deploy.ts
        
        # in root folder
        yarn deploy 

        # for destroying what deploy.sh script created run (in root folder)
        yarn destroy

        NOTE: if you are having issues with runing sh scripts run
        chmod u+x ./scripts/deploy.sh
        chmod u+x ./scripts/destory.sh
        
            
