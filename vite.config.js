import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';

function pathResolve(dir) {
  console.log(process.cwd(), dir, resolve(process.cwd(), '.', dir));
  return resolve(process.cwd(), '.', dir);
}

// https://vitejs.dev/config/
export default defineConfig(({ commend, mode }) => {
  // root 默认：process.cwd(项目根目录
  const root = process.cwd();
  // 获取环境变量
  var env = loadEnv(mode, root);

  return {
    // 设置打包路径 - 开发或生产环境服务的公共基础路径 默认：/
    base: env.VITE_PUBLIC_PATH,
    // 项目根目录
    root,
    // 需要用到的插件数组
    plugins: [vue()],
    // 静态资源服务的文件夹 默认：public 设定为 false 可以关闭此项功能
    publicDir: false,
    // // 存储缓存文件的目录 默认：node_modules/.vite
    // cacheDir: "node_modules/.vite",
    resolve: {
      //配置别名，在项目中可缩减引用路径
      alias: [
        // /@/xxxx => src/xxxx
        {
          find: /\/@\//,
          replacement: pathResolve('src') + '/',
        },
        // /#/xxxx => types/xxxx
        {
          find: /\/#\//,
          replacement: pathResolve('types') + '/',
        },
      ],
    },
    // 调整控制台输出的级别 info|warn|error|silent 默认：info
    logLevel: 'info',
    // 开发服务器选项
    server: {
      // 指定服务器监听哪个IP true/0.0.0.0：监听所有本地IP(包括局域网和公网地址) 默认：127.0.0.1
      host: true,
      // 指定开发服务器端口 若端口被占用则自动尝试下一个端口
      port: env.VITE_PORT,
      // 设为 true 时 若端口被占用则会直接退出 不会尝试下一个端口
      strictPort: true,
      // 启用TLS + HTTP/2 server.proxy代理选项被使用时 将会仅适用TLS
      https: true,
      // 设为 true 时启动时在浏览器打开页面 若为 字符串 时 则会别用做URL的路径
      open: true,
      // 设置是否跨域 默认允许任何源 传递一个CorsOptions对象可调整跨域 设为false则禁用
      cors: true,
    },
  };
});
