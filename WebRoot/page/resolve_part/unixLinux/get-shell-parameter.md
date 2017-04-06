### Using shift to remove the parameter with while/case

```bash
#!/bin/bash

HELP_MESSAGE=$(
cat << 'EOF-heredoc'
Usage:
  sh deploy.sh [options] environment

Options:
    --all-in-one                            Deploy on multiple nodes default
    --upgrade                               Don't upgrade default when deploy
    --reconfigure                           Generate config and restart container
    --openstack-release <openstack-version> Specify openstack version to deploy
    --help, -h                              Show this help information

Available environment:
    exp/dev/prod-dev/prod-prod
EOF-heredoc
)

while :; do
    case $1 in
        -h|-\?|--help)   # Display a synopsis, then exit.
            echo "$HELP_MESSAGE"
            exit
            ;;
        --all-in-one)       # Takes an option argument, ensuring it has been specified.
            all_in_one=true
            shift
            ;;
        --upgrade)       # Takes an option argument, ensuring it has been specified.
            upgrade=true
            shift
            ;;
        --reconfigure)       # Takes an option argument, ensuring it has been specified.
            reconfigure=true
            shift
            ;;
        --openstack-release) # Get openstack-release
            openstack_release=$2
            shift 2
            ;;
        --)              # End of all options.
            shift
            break
            ;;
        -?*)
            printf 'WARN: Unknown option (ignored): %s\n' "$1" >&2
            ;;
        *)               # Default case: If no more options then break out of the loop.
            break
    esac
done
```
ע������:
* shift:�ƶ�������shift(shift 1) ����ÿִ��һ�Σ������ĸ���($#)��1(֮ǰ��$1����������,֮���$2�ͱ����$1)��������ֵ��ǰһλ��ͬ��shift n��ǰnλ�������ᱻ���١�
* shell�е�while�﷨:

```bash
while [ expression ]
do
  �����
done
```
* shell�ֵ�case�﷨:

```bash
case �ַ������ʽ in  
  "ֵ1")  
    ������  
    ;; #����case�ṹ,�൱��break;  
  "ֵ2")  
    ������  
    ;;  
   ...  
  *)  
    ������ (������������������)  
    ;;  
esac  
```

### Using getopts with while/case

```bash
help() {
    echo "sh build.sh [OPTIONS] -t TYPE -v VERSION"
    echo "    -h         Print usages"
    echo "    -o         enable octopus/base build"
    echo "    -b         enable build image ceph-docker-plugin"
    echo "    -c         enable create plugin ceph-docker-plugin"
    echo "    -p         enable push image/plugin to repository"
    echo "    -t TYPE    ncloud/test/prod-dev/prod-prod"
    echo "    -v VERSION Plugin Version (tag) "
    exit 0
}

ENABLE_OCTOPUS_BASE=false
ENABLE_BUILD_PLUGIN=false
ENABLE_CREATE_PLUGIN=false
ENABLE_PUSH=false
WORKSPACE=/opt/octopus-plugin

if [ $# -eq 0 ] ; then
    help 
fi

while getopts "t:v:obcph" opt
do
    case $opt in
        t) TYPE=$OPTARG
          ;;
        v) VERSION=$OPTARG
          ;;
        o) ENABLE_OCTOPUS_BASE=true
          ;;
        b) ENABLE_BUILD_PLUGIN=true
          ;;
        c) ENABLE_CREATE_PLUGIN=true
          ;;
        p) ENABLE_PUSH=true
          ;;
        h) help ;;
        ?) help ;;
    esac
done
```
ע������:
* �﷨:getopts [option[:]] VARIABLE��ͨ����while��ϻ�ȡshell�����в���,���ĳ��option���������ð��(":")�����ʾ���ѡ�ͺ�����ԽӲ���,
VARIABLE����ʾ��ĳ��ѡ����ڱ���VARIABLE�С�
* getopts�������������ñ�������OPTARG��OPTIND,OPTARG���ǽ�ѡ�����Ĳ���ֵ����������������У�OPTIND�������ʾ�����е���һ��ѡ���������������ļ�������ѡ��������
* shell�������
  * $0:��ǰ�ű���
  * $n:�������ű������ĵ�n����������:./script.sh a1 a2 a3������$0Ϊscript.sh��$1Ϊa1��$2Ϊa2��$3Ϊa3��
  * $#:���ݸ��ű������Ĳ���������
  * $?:��������˳�״̬��һ��0Ϊ����״̬����0Ϊ�쳣״̬��
  * $$:��ǰshell����ID������Shell �ű���������Щ�ű����ڵĽ���ID��

�ο�����:
* http://blog.csdn.net/swandy45/article/details/8191503
* http://xslwahaha.blog.51cto.com/4738972/1574548
