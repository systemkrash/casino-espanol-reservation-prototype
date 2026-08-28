import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/casino-espanol-reservation-prototype/",
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            { name: "react", test: /node_modules\/(react|react-dom)\// },
            { name: "icons", test: /node_modules\/@ant-design\/icons/ },
            { name: "antd-table", test: /node_modules\/antd\/es\/table/ },
            { name: "antd-data", test: /node_modules\/antd\/es\/(statistic|progress|timeline|badge|tag|avatar)/ },
            { name: "antd-input", test: /node_modules\/antd\/es\/(button|drawer|menu|segmented|select|switch|tooltip|card)/ },
            { name: "antd-core", test: /node_modules\/antd/ },
          ],
        },
      },
    },
  },
});
