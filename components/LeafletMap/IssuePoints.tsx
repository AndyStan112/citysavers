import IssueMarker from "./MapIssueMarker";
import { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";

type IssuePoint = {
  id: string;
  category: string;
  latitude: number;
  longitude: number;
};

export default function IssuePoints() {
  const [issuePoints, setIssuePoints] = useState<IssuePoint[]>([]);

  const fetchPoints = async () => {
    await fetch("/api/map/get")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setIssuePoints(data);
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar("Failed to get map data points.");
      });
  };

  useEffect(() => {
    fetchPoints();

    const intervalId = setInterval(() => {
      fetchPoints();
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      {Array.isArray(issuePoints) &&
        issuePoints.map((value, index) => (
          <IssueMarker
            key={index}
            latitude={value.latitude}
            longitude={value.longitude}
            issueId={value.id}
            category={value.category}
          />
        ))}
    </>
  );
}
