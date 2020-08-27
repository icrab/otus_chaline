FROM centos:7

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]
WORKDIR /home/www/app

### Install dependencies
RUN yum install https://repo.ius.io/ius-release-el7.rpm https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm -y \
    && yum install python36 python3-devel -y \
    && yum -y install python3-pip


COPY requirements.txt /home/www/app/
RUN /bin/bash -c "pip3 install --upgrade pip"
RUN /bin/bash -c "pip3 install -r /home/www/app/requirements.txt"

ADD . /home/www/app/
