### ceph�߼��ܹ�
Ceph�Ƿֲ�ʽ�洢ϵͳ�������ص��ǣ�
* ����չ�ԣ�ʹ����ͨx86��������֧�ִ��ģ�������ֲ�ʽ����֧��TB��PB������չ��
* �߿ɿ��ԣ�û�е�����ϣ������ݸ������Զ������Զ��޸���
* �����ܣ����ݷֲ����⣬���л��ȸߡ�����objects storage��block storage,����ҪԪ���ݷ�������
��ͼΪ���߼��ܹ�:
![](images/ceph-logic-arc.png)

ceph���߼��ܹ������¶��ϣ���Ϊ4�����
* �����洢ϵͳRADOS��Reliable, Autonomic, Distributed Object Store�����ɿ��ġ��Զ����ġ��ֲ�ʽ�Ķ���洢��

��һ�㱾�����һ�������Ķ���洢ϵͳ��c++ʵ�֣����д洢��Cephϵͳ�е��û�������ʵ�����ն�������һ�����洢�ġ�
��Ceph�ĸ߿ɿ����߿���չ�������ܡ����Զ����ȵ����Ա�����Ҳ������һ�����ṩ�ġ���ʹ��radosʱ���ͻ���ֱ��
��OSD��monitor������ȡcluster map������crush�㷨��crush rule��������洢λ��.

* ������librados

��rados���еĳ���ͷ�װ��ʹ��c++ʵ�֣�����Ҳ֧�ָ���������:java/python/ruby/php��ע��:����rados�Ķ���洢���ܣ�
����������ceph��

* �߲�Ӧ�ýӿڣ�RBD��CephFS��RADOSGW��

* ����ʹ�ó�����Ӧ�ò�:�����RBDʵ�ֵ���Ӳ�̣�����libradosʵ�ֵĶ���洢Ӧ�á�

�ο�����:

* http://www.uml.org.cn/yunjisuan/2014041107.asp
* https://www.ustack.com/blog/ceph_infra/
* http://www.cnblogs.com/sammyliu/p/4836014.html

### ceph����ܹ�
��ͼΪ���߼��ܹ�:

![](images/ceph-physical-arc.jpg)

* OSD�� Object Storage Device���ṩ�洢��Դ��
* Monitor��ά������Ceph��Ⱥ��ȫ��״̬��
### ���ļ����浽osd���̵�����
��ͼΪ����ͼ:

![](images/file-save-to-osd-flow.png)

* File->objӳ��:�����ļ�����object�����size(��4M)�����з֡��зֺ��object�������ļ���inode�ź��зֵ�ojbect���к�����Ψһ�Ķ���ID.
  ��objectId = function(File.inode, object���к�)
* Object->PGӳ�䣬pg���=hash(objectid)% pg_num����pg-id=pool-id.pg��ţ���pg-id=pool-id.hash(objectid)% pg_num����4.58��
����˵��:pool�Ǹ��߼�����൱�������ռ䣬������lvm�е�volume group(����)�ĸ��rbd image�൱��logic volume(�߼���)�ĸ���
ע��:Ϊʲô������PG��һ��:
  * ������metadata��������ֻ��Ҫ����PG��metadata�Ϳ�����,PG������ԶԶС��object��������
  * ����PG�����������Ծ���ÿ��OSD�ĸ��أ���߲��жȡ�
  * �ָ��������ṩ���ݵĿɿ��ԡ�
* PG->OSDSӳ�䣬ͨ��crush�㷨����pg��osd���̵�λ�ã���osd-ids[1,2,3]=Crush(pg-id,cluser-map,crush rule)��
�㷨����:ϵͳ״̬(cluster map)��Crush rule(�洢����)������cluster map�ı�һ��Ϊ�豸�𻵺ͼ�Ⱥ��ģ������������������
Crush ruleһ�㲻��ı䡣rushα����㷨����:
  * �㷨�ȶ������ڼ�Ⱥ��ģ���󣬴󲿷�PG��OSD��ӳ���ϵ����ı䡣
  * ����Ҫ��ѯ��ֻ��Ҫ�ڱ������㼴�ɣ���Ч��
  

### cephǿһ����
��ͼΪclient��osd����������ͼ

![](images/ceph-strong-consistency.png)
* Ceph�Ķ�д��������Primary-Replicaģ�ͣ�Clientֻ��Object����ӦOSD set��Primary�����д�����Ᵽ֤�����ݵ�ǿһ���ԡ�
* ��Primary�յ�Object��д����ʱ������������ݷ��͸�����Replicas��Ȼ��Replicas����󣬷ֱ���primary����ȷ�ϣ�primaryȷ�ϸ���
д����ɺ��Լ�Ҳ���д�룬�����clientȷ��object����д�롣Primary��Ӧ��Object��д�����Ᵽ֤�˸�����һ���ԡ�
�����������̵�д����Ȼ�����˿ɿ��ԣ�������������ӳ١����ceph�ڴ˻����Ͻ��ж���ȷ�ϵĸĽ���

![](images/ceph-apply-commit.jpg)
* ���ceph��������client����ȷ�ϣ���ο���ͼ������osd��������д�뵽journal�̺�����client���͵�һ��ȷ�ϣ�
������д����̺��ڷ���һ������ȷ���źţ��ͻ����յ�����ȷ�Ϻ�ɾ���������ݡ�(����journal�̾�����ssd)��
* ��д�뷽�棬��ע��һ�㣬ceph��û�������ĸ����Ϊһ��object����Ϊһ�������ĵ��ļ����棬���ǿ��Կ���RBDд��object�ķ�ʽ��
Ĭ����һ��objectд����д��һ��object��ͨ���ƶ�order(2��22�η�=4M),strip_unit(��������С���������),strip_count(�������)������
�Զ���Ĳ���д�롣Ϊʲô�������������,��Ҫ�ǵ����洢�豸�������I/O�����Լ����紫�����ƣ����ﵽ���ֵ������������ͬʱд������
�Ľ��̻����������Դ洢ϵͳһ���֧������������������������Ϣ��Ƭ�洢�ڶ���豸��
* ��Զ�������ֻ��Ҫ���͸�primary OSD���ɣ�����Ҫ���͸���OSD����Ϊceph�洢����PGΪ��λ��1���ļ���������PG�����ɸ�PG̯��������ô����
���е�OSD�����յ����������Դ�ȫ����Ҳ������Ϊ�Ǹ��ؾ���ġ�

### ceph״̬ͼ
�������:Ӧ�ý�ceph״̬�����ָ�Ϊceph��������Ϊ��ĳһ�������ĳһ��ʱ��ֻ����һ��״̬(΢�����ӳ���)������һ��������ͬһʱ��ȴ����
���������ʵ���ϣ�ceph��pg�����ǿ��Կ��������ж��"����"���硰active+clean����׼ȷ��˵��Ӧ���Ƕ��������
����Ȼ��Ҷ���ô�У��Ǿ�û�취��!��ͼΪceph״̬ͼ�����ע�⣬ceph��״̬�ǵ��ӵģ�������ͬʱ���ж��״̬��ͼ�С�+���ĺ�����ǵ��ӵ���˼
![](images/ceph-pg-status.png)

״̬˵��:
* Creating �����У�PG ���ڱ�������
* Peering �ԵȻ�������ʾһ�����̣��ù�����һ�� PG ������ OSD ����Ҫ����ͨ������PG �Ķ�����Ԫ���ݵ�״̬���һ�¡�
���ڸ�״̬��PG������ӦIO����Peering�Ĺ�����ʵ����pg״̬�ӳ�ʼ״̬Ȼ��active+clean�ı仯���̡�һ�� OSD ����֮��
�����pg��ʼ������״̬Ϊinitial����ʱ���бȶ�����osd�ϵ�pglog��pg_info����pg��������Ϣ����ͬ����ѡ��primary osd��replica osd��peering���̽�����
Ȼ���peering�Ľ������recovering����recovering���̽������ݵĻָ�������
* Active ��ģ�Peering ������ɺ�PG ��״̬���� active �ġ���״̬�£�������OSD �ϵ�PG ���ݶ��ǿ��õġ�
* Clean �ྻ�ģ���״̬�£����� OSD ���Ѿ��� peered �ˣ�ÿ�������������ˡ�
* Down��PG �����ˣ���Ϊ�����ĳЩ�ؼ����ݣ����� pglog �� pginfo������Ҳ�Ǳ�����OSD�ϣ��ĸ��� down �ˡ�
* Degraded �����ģ�ĳ�� OSD ������ֹͣ���� ��down���˺�Ceph MON ���� OSD �ϵ����� PG ��״̬����Ϊ degraded��
��ʱ�� OSD �� peer OSD ������ṩ���ݷ�����ʱ�������ֽ����һ����������������������������ʱ����
��Ҫ�پ��� peering �����ٵ�clean ״̬������ Ceph �ᷢ�� recovery ���ָ������̣�ʹ�� OSD �Ϲ��ڵ����ݱ��ָ�������״̬��
���� OSD �� down ״̬���� 300 �����״̬������Ϊ out��Ceph ��ѡ�������� OSD ���� acting set�����������backfilling�����ݵ��� OSD �Ĺ��̣�
ʹ PG �������ָ����涨����Ŀ��������Բο� PG �����ݻָ����̡�
* Recovering �ָ��У�һ�� OSD down ��������� PG �����ݵİ汾�������OSD�ϵ� PG �����İ汾�����������֮�󣨱�����������ʱ����
Ceph ������ recovery ������ʹ�����ݵõ����¡�
* Backfilling �����У�һ���� OSD ���뼯Ⱥ��Ceph �᳢�Լ����������� OSD �ϵ� PG Ų������ OSD �ϣ��˹��̱���Ϊ���
�� recovery ��ȣ����backfill�����������ݵ��������ȫ�����������ָ���recovery�������������ݵĻ������������ָ���
* Remapped ��ӳ�䣺ÿ�� PG �� acting set �ı�󣬾ͻᷢ���Ӿ�  acting set ���� acting set ������Ǩ�ơ�
�˹��̽���ǰ���� acting set �е��� OSD �������ṩ����һ���ù��̽�����Ceph ��ʹ���� acting set �е��� OSD ���ṩ����
* Stale ���ڵģ�OSD ÿ�� 0.5 ���� MON ������״̬�������Ϊ�κ�ԭ���� OSD ����״̬ʧ���ˣ���������OSD�Ѿ��������� OSD down �ˣ�
�м��ֿ��ܣ�����OSD��������OSD֮���л�ʱ������ݳ���stale״̬��������OSD������ʱ���᳤�ڳ���stale״̬��
* incomplete:PG��OSD��Ŀ�����Խ������ݻָ�ʱ����ʱ������OSD��Ŀ����Ԥ��ĸ�����Ŀ�ˡ�


�ص�˵��:
* Peering����Ϊ����������(�˴�Ϊ���õĸ���������ͨ������Ϊ3)pg��Ԫ���ݴﵽһ�µĹ��̣����һ�º󣬸���������һ���������°汾�����ݡ�
����peering״̬��PG������ͣ����IO���������������б���Ϊ��Ⱥ����IO����Ӧ������ĳЩ��������Ϊ�ȴ�IO���Ӧ���޷���������
* Acting set:��crush�㷨�����OSD�����б���[1,2,3]������1Ϊ��OSD��2��3Ϊ��OSD����һ����Ч��
* Up set:���������£�Acting Set��Up set��һ�µģ����ǳ���pg_temp��
  * pg_temp����:���赱һ��PG�ĸ�����������ʱ����ʱ�ĸ������Ϊacting/up  = [1,2]/[1,2]����ʱ���һ��OSD.3��ΪPG�ĸ�����
    ����crush�ļ��㷢�֣����OSD.3Ӧ��Ϊ��ǰPG��primary�������أ���OSD.3���滹û��PG�����ݣ������޷��е�primary��������Ҫ��ʱ����һ��acting set��
    �����pg_temp�����pg_temp�ͻ�����OSD.1��Ϊprimary����ʱpg�ļ���Ϊacting��pg_temp�ļ���Ϊup����Ȼpg��pg_temp�ǲ�һ���ģ�
    ������ʱpg�ļ��ϱ����[3,1,2]/[1,2,3]����OSD.3�ϵ�����ȫ�����ָ���ɺ󣬾ͱ����[3,1,2]/[3,1,2]
* Up set�����Ϊ��ǰ����Ч��OSD���ϣ�Acting set�����Ϊcrush�㷨�����������������ɵ�OSD���ϡ�

�ο�����
* http://docs.ceph.com/docs/master/rados/operations/pg-states/
* http://www.cnblogs.com/sammyliu/p/4836014.html

### cephx��֤
cephx��֤��������ͼ��

![](images/cephx-whole-flow.png)

cephx�����û�������Կ����ͼ��

![](images/cephx-create-user.png)

cephx����session key��ticket����ͼ��

![](images/cephx-get-session-key-and-ticket.png)

˵��:
* ��ȫ�������ϵ��Ϊ�ԳƼ���(�������)�ͷǶԳƼ���(��Կ����)������https�ۺ�ʹ���˷ǶԳƼ��ܺͶԳƼ��ܡ�
* ����֤��:�ڷǶԳƼ����У�Ŀ��Ϊ:������Կ�İ�ȫ����ֹ�ڿ�����Ƿ���Կ���Լ���������Կ���滻������Ҫ��֤������CA��
�Թ�Կ����֤����֤���������Լ���˽Կ���Ա����Ĺ�Կ��һЩ�����Ϣһ����ܣ�����"����֤��"��Digital Certificate����
������й̻���CA�Ĺ�Կ�����Խ⿪������֤�顱�õ���Կ��
* ����ǩ��:��ֹ��Ϣ���۸ĺ�֤����Ϣȷʵ���Լ����������ۺ�ʹ���˵����ɢ���㷨�ͷǶԳƼ��ܡ�
  * �ȶ���Ϣ�õ���ɢ���㷨����ժҪ��
  * Ȼ���ڶ�ժҪ��˽�н��м��ܡ�
* ceph�е�cephx��֤���ǶԳƼ���(�������)����������Ҫ��ĳ���ڵ����cephʱ��ֻ��Ҫ��װceph�ͻ��˳���Ϳ���
ceph.client.${user}.keyring��/etc/ceph�£��Ϳ���ִ��ceph����������ˣ���ceph -s --id ${user}

��̫���Ĳ���:
* ceph��֤ʱ��ΪʲôҪ��ȡsession key�أ�ֱ�ӻ�ȡticket����������?

�ο�:
* http://docs.ceph.com/docs/firefly/rados/operations/auth-intro/
* http://zhaozhiming.github.io/blog/2014/09/13/ceph-authentication-theory/

### ceph����
����ܹ�ͼ:

![](images/ceph-network_arc.png)

* public����(��ǰ������)������ceph�ͻ�����ceph������
* cluster����(��������)���û�����ceph���洢�ڵ㣬��ceph���ģ���ݵ�ʱ��������Ϊ���ԡ�
��˾��һ����������ֻ��public����ʱ������OSD������ceph��Ҫ�������ݡ����µ�OSD����������
��5Сʱ�������ר�ŵļ�Ⱥ����(��Ҫ�䱸���׽������͹���)�������Ӽ���������ɡ�

### crush�㷨
��д
* https://my.oschina.net/u/2460844/blog/531722
* http://www.cnblogs.com/sammyliu/p/4836014.html
* http://www.cnblogs.com/sammyliu/p/5568989.html (��βҲ�����Ƶ�����)