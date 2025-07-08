const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = withNativeWind(getDefaultConfig(__dirname), {
  input: "./src/styles/global.css",
});

// Modificações para suportar SVGs com react-native-svg-transformer
config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve("react-native-svg-transformer"),
};

config.resolver.assetExts = config.resolver.assetExts.filter(
  (ext) => ext !== "svg"
);

config.resolver.sourceExts = [...config.resolver.sourceExts, "svg"];

module.exports = config;
