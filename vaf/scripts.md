# scripts 使用

## 测试开发 vaf 源码

```
npm run dev
```

## 构建 vaf 包后，测试开发 vaf 包

```
npm run dev:lib
```

## 构建 vaf 包，包含 `非压缩混淆版` 与 `压缩混淆版` 两种方式

```
npm run build
```

## 构建 vaf 包，构建预览代码，并开启预览服务器

```
npm run preview
```

## 发布 vaf 包

```
npm run pub
```

## 更新版本号与提交标签

```
# 更新版本号
npm version patch
npm version minor
npm version major

# 提交记录、标签
git push
git push origin v0.0.1
```
