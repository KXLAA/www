import splitbee from "@splitbee/web";
import React from "react";

export function useAnalytics() {
  return React.useEffect(() => {
    splitbee.init({
      scriptUrl: `/bee.js`,
      apiUrl: `/_hive`,
    });
  }, []);
}
