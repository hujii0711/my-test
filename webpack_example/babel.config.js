module.exports = function (api) {
  console.log(
    "babel.config.js 실행@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
  );
  // plugin이나 preset을 캐시하여 다시 실행하지 않도록
  api.cache(true);

  // preset 추가
  const presets = [
    [
      "@babel/preset-env",
      {
        targets: {
          browsers: ["last 2 versions", "> 0.1%", "not dead", "ie >= 11"],
        },
        useBuiltIns: "usage",
        //targets: "> 0.25%, not dead",
        // 0.25% 이상의 시장 점유율을 가지는 브라우저에 대해 지원하겠다.
        // not dead : 보안 update를 하는 브라우저에 대해 지원하겠다.
        //useBuiltIns: "entry",
        // 모든 polyfill을 가져오는게 아니라 필요한 Polyfill를 import해서 사용하겠다.
        //modules: true,
        // ES6의 module syntax를 지원하겠다.
      },
    ],
  ];

  const plugins = [["@babel/plugin-transform-runtime", { corejs: 3 }]];

  return { presets, plugins };
};

// const presets = [ ... ];
// const plugins = [ ... ];
// module.exports = { presets, plugins };
