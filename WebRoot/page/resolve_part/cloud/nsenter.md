###  ����������docker�����ķ�ʽ
* docker attach: ������ڣ� ���׿��� 
* docker exec: �õý�Ϊ�ձ�
* ssh ��ʽ:��Ҫ������������sshd�����ڿ����͹�������������⡣ͬʱҲΥ����Docker������ 
��һ������һ�����̵�ԭ��
* nsenter:

```
docker inspect --format "{{ .State.Pid }}" <containerId>
nsenter --target ${Pid} --mount --uts --ipc --net --pid
```

please refer to: 
  * https://github.com/jpetazzo/nsenter
  * http://www.oschina.net/translate/enter-docker-container?print

### �ص�˵��nsenter
��������Ŀ�У��и���������Ҫ�������й���һ�����ù��ؼ�¼��Ҫ������������������������nsenter����
ʵ�ָ�������ο�:http://michaelneale.blogspot.kr/2015/02/mounting-devices-host-from-super.html
* ����һ������

 ```
docker run  -t  --net=host --privileged=true --name=ceph-docker-plugin \ #��Ȩ��ʽ����
-v /proc:/media/proc \      #��Ҫ������������/procĿ¼����������
-v /var/run/docker/plugins:/var/run/docker/plugins \
-v /var/lib/docker/containers:/var/lib/docker/containers \
-v /var/lib/ceph/mount:/var/lib/ceph/mount \
-v /var/log/messages:/var/log/messages \
-v /etc/ceph:/etc/ceph \
-v /etc/octopus/config.json:/etc/octopus/config.json \
-v /etc/hosts:/etc/hosts \
-v /dev:/dev \   #��Ҫ��������/devĿ¼����������
-v /sys:/sys \
${��������} bash
 ```
* �������ڲ�ͨ��nsenter���й���

 ```
 nsenter --mount=/media/proc/1/ns/mnt -- mount /dev/rbd0 /var/lib/ceph/mount/test/
 ```

* �����������ⲿͨ��root�û�ִ��mount������Բ鿴�����ؼ�¼
