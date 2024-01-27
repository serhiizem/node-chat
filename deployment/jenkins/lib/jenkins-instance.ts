import {Construct} from "constructs";
import {
    BlockDeviceVolume,
    EbsDeviceVolumeType,
    Instance,
    InstanceClass,
    InstanceSize,
    InstanceType,
    IVpc,
    MachineImage,
    OperatingSystemType,
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

        const jenkinsRole = new Role(this, "RoleJenkins", {
            assumedBy: new ServicePrincipal("ec2.amazonaws.com"),
            managedPolicies: [
                ManagedPolicy.fromAwsManagedPolicyName("AmazonSSMFullAccess"),
            ]
        });

        const jenkinsSg = new SecurityGroup(this, "SecurityGroupJenkins", {
            vpc: props.vpc,
            allowAllOutbound: true
        });

        jenkinsSg.addIngressRule(Peer.anyIpv4(), Port.tcp(8080));
        jenkinsSg.addIngressRule(Peer.anyIpv6(), Port.tcp(8080));

        const linuxMachineImage = MachineImage.fromSsmParameter(
            '/aws/service/canonical/ubuntu/server/focal/stable/current/amd64/hvm/ebs-gp2/ami-id',
            {os: OperatingSystemType.LINUX},
        );

        const jenkinsEc2 = new Instance(this, "JenkinsEC2", {
            vpc: props.vpc,
            vpcSubnets: props.vpc.selectSubnets({subnetGroupName: "Public"}),
            role: jenkinsRole,
            securityGroup: jenkinsSg,
            instanceType: InstanceType.of(InstanceClass.T2, InstanceSize.MICRO),
            machineImage: linuxMachineImage,
            blockDevices: [
                {
                    deviceName: "/dev/sda1",
                    volume: BlockDeviceVolume.ebs(100, {
                        encrypted: true,
                        volumeType: EbsDeviceVolumeType.GP3
                    })
                }
            ]
        });

        const userDataScript = fs.readFileSync("./scripts/ec2-accessibility-test.sh", "utf8");
        jenkinsEc2.addUserData(userDataScript);

        new CfnOutput(this, "jenkinsUrl", {
            value: `http://${jenkinsEc2.instancePublicIp}/`,
            exportName: "jenkinsUrl"
        });
    }
}