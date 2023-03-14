# Docker 发布流程

## 构建 Docker 

### 构建 Docker
```
docker build -t amiintellect/amiintellect-customs-edge-web-html -f Dockerfile ./
```

## 发布 Docker

### 登录私有仓库
```
docker login -u [USERNAME] -p [PASSWORD] docker.dev.amiintellect.com
```

### 设置 Docker 标签
```
docker tag amiintellect/amiintellect-customs-edge-web-html:latest docker.dev.amiintellect.com/amiintellect/amiintellect-customs-edge-web-html:1.0
```

### 推送 Docker 镜像
```
docker push docker.dev.amiintellect.com/amiintellect/amiintellect-customs-edge-web-html:1.0
```

## 使用 Docker

### 拉取 Docker
```
docker pull docker.dev.amiintellect.com/amiintellect/amiintellect-customs-edge-web-html:1.0
```

### 运行 Docker 
```
docker run -d -p 8080:80 --name amiintellect-customs-edge-web-html amiintellect/amiintellect-customs-edge-web-html:1.0
```
