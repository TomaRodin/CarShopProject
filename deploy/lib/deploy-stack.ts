import { RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Bucket, BucketEncryption } from 'aws-cdk-lib/aws-s3';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { CnameRecord, HostedZone } from 'aws-cdk-lib/aws-route53';

export class DeployStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    
    // Site bucket
    const siteBucket = new Bucket(this, `${id}-bucket`, {
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'error.html',
      removalPolicy: RemovalPolicy.DESTROY,
      bucketName: `${id}.codevibe.hr`,
      publicReadAccess: true,
      encryption: BucketEncryption.S3_MANAGED,
      autoDeleteObjects: true
    })

    // Static Code in to Bucket.
    new BucketDeployment(
      this,
      `${id}-deploy`,
      {
        sources: [Source.asset('../dist')],
        destinationBucket: siteBucket,
      }
    );   

    //Lookup the zone based on domain name
    const zone = HostedZone.fromLookup(this, 'baseZone', {
      domainName: 'codevibe.hr'
    });

    //Add the Subdomain to Route53
    new CnameRecord(this, `${id}-cname-record`, {
      zone: zone,
      recordName: id,
      domainName: siteBucket.bucketWebsiteDomainName
    });
  }
}
