import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import useQuery from "Hooks/useQuery";

const chartApiRoot = "https://chart.googleapis.com/chart";

/**
 * Get query parameter code from URL
 * Generate associated QR code image URL.
 */
function useGetQrUrl() {
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const history = useHistory();

  const queryParams = useQuery();
  useEffect(() => {
    const code = queryParams.get("code");
    if (!code) {
      history.push("/merchant");
    }
    const searchParams = new URLSearchParams();
    searchParams.set("cht", "qr");
    searchParams.set("chl", code);
    searchParams.set("chs", "500x500");
    searchParams.set("choe", "UTF-8");
    setQrCodeUrl(`${chartApiRoot}?${searchParams.toString()}`);
  }, []);

  return qrCodeUrl;
}

export default useGetQrUrl;
