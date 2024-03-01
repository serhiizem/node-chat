import {Construct} from "constructs";
import {
    Instance,
    InstanceClass,
    InstanceSize,
    InstanceType,
    IVpc,
    MachineImage,
    Peer,
    Port,
    SecurityGroup
} from "aws-cdk-lib/aws-ec2";
import * as fs from "fs";
import {ManagedPolicy, Role, ServicePrincipal} from "aws-cdk-lib/aws-iam";
import {CfnOutput} from "aws-cdk-lib";

type JenkinsInstanceProps = {
    vpc: IVpc;
};

export class JenkinsInstance extends Construct {

    constructor(scope: Construct, id: string, props: JenkinsInstanceProps) {
        super(scope, id);

        const jenkinsRole = this.createJenkinsRole();
        const jenkinsSg = this.createSecurityGroup(props.vpc);

        const jenkinsEc2 = new Instance(this, "JenkinsEC2", {
            vpc: props.vpc,
            vpcSubnets: props.vpc.selectSubnets({subnetGroupName: "Public"}),
            role: jenkinsRole,
            securityGroup: jenkinsSg,
            instanceType: InstanceType.of(InstanceClass.T2, InstanceSize.MICRO),
            machineImage: MachineImage.latestAmazonLinux2(),
            keyName: "jenkins-key-pair"
        });

        const userDataScript = fs.readFileSync("./scripts/ec2-accessibility-test.sh", "utf8");
        jenkinsEc2.addUserData(userDataScript);

        new CfnOutput(this, "jenkinsUrl", {
            value: `http://${jenkinsEc2.instancePublicIp}/`,
            exportName: "jenkinsUrl"
        });
    }

    private createJenkinsRole(): Role {
        return new Role(this, "RoleJenkins", {
            assumedBy: new ServicePrincipal("ec2.amazonaws.com"),
            managedPolicies: [ManagedPolicy.fromAwsManagedPolicyName("AmazonSSMFullAccess")]
        });
    }

    private createSecurityGroup(vpc: IVpc): SecurityGroup {
        const jenkinsSg = new SecurityGroup(this, "SecurityGroupJenkins", {
            vpc, allowAllOutbound: true
        });

        [22, 80, 8080, 9000].forEach(port =>
            jenkinsSg.addIngressRule(Peer.anyIpv4(), Port.tcp(port)));

        return jenkinsSg;
    }
}