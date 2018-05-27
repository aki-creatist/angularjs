FROM centos:centos7

# sysconfig network
RUN echo "NETWORKING=yes" > /etc/sysconfig/network
RUN yum -y install epel-release.noarch
RUN yum update -y
RUN yum install -y passwd sudo gcc gcc-c++ make cmake vim git tree
RUN yum install --enablerepo=epel -y mosh

# for ruby install
RUN yum install -y bzip2

# phantom
RUN rpm -ivh http://repo.okay.com.mx/centos/7/x86_64/release/okay-release-1-1.noarch.rpm
RUN yum search all phantomjs
RUN yum -y install phantomjs.x86_64

# user
RUN useradd python_spameggs
RUN echo 'foo' | passwd --stdin python_spameggs

# sudo
RUN echo 'python_spameggs ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers.d/python_spameggs

# timezone
RUN cp -p /usr/share/zoneinfo/Japan /etc/localtime

USER python_spameggs
WORKDIR /home/python_spameggs
# anyenv
RUN git clone https://github.com/riywo/anyenv .anyenv
ENV HOME /home/python_spameggs

# anyenv update
RUN mkdir -p .anyenv/plugins
RUN git clone https://github.com/znz/anyenv-update.git .anyenv/plugins/anyenv-update

USER root

COPY ./.bash_profile /home/python_spameggs/.bash_profile

RUN /bin/bash -l -c 'anyenv install nodenv'
RUN /bin/bash -l -c 'nodenv install 0.12.7'
RUN /bin/bash -l -c 'nodenv global 0.12.7'
RUN /bin/bash -l -c 'nodenv rehash'

CMD ["/sbin/init"]