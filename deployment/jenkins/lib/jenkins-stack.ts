import {Stack, StackProps, Tags} from 'aws-cdk-lib';
import {Construct} from 'constructs';
import {Networking} from "./networking";
import {JenkinsInstance} from "./jenkins-instance";

export class JenkinsStack extends Stack {

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const networkingStack = new Networking(this, "NetworkingConstruct", {
            maxAzs: 1
        });

        Tags.of(networkingStack).add("Module", "Networking");

        const instanceStack = new JenkinsInstance(this, "DeploymentInstanceConstruct", {
            vpc: networkingStack.vpc
        });

        Tags.of(instanceStack).add("Module", "Deployment");
    }
}
