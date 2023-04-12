# tsconfig-extends

A Umi plugin can merge user-defined json objects into .umi to generate tsconfig.json

一个 Umi 插件可以给用户自定义 json 对象合并到.umi 生成 tsconfig.json

## Install

```bash
pnpm i @dl-umi-plugin/tsconfig-extends
```

```bash
yarn i @dl-umi-plugin/tsconfig-extends
```

## Usage

Configure in `.umirc.ts`,

```js
export default defineConfig({
  //import tsconfig-extends plugin
  plugins: [require.resolve('@dl-umi-plugin/tsconfig-extends')],
  // how to use
  tsconfigExtends: (data) => {
    return {
      compilerOptions: {
        paths: {
          '@dg/*': ['./packages/*'],
        },
      },
    };
    //or
  tsconfigExtends: {
      compilerOptions: {
        paths: {
          '@dg/*': ['./packages/*'],
        },
      },
    },


});

```

## HOW TO BUILD

```bash
pnpm build
```

## LICENSE

MIT
