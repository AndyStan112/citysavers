import { Marker, useMap } from "react-leaflet";
import {
  AbandonedVehicleIcon,
  BlockedRoadIcon,
  LitterIcon,
  VandalismIcon,
} from "@/constants/MapIcons";
import { useRouter } from "next/navigation";

export default function IssueMarker({
  latitude,
  longitude,
  issueId,
  category,
}: {
  latitude: number;
  longitude: number;
  issueId: string;
  category: string;
}) {
  const router = useRouter();
  const map = useMap();

  const markerClickHandler = () => {
    map.flyTo([latitude, longitude], 16);
    router.push("/map/issue/" + issueId);
  };

  return (
    <Marker
      position={[latitude, longitude]}
      icon={
        category == "abandoned-vehicle"
          ? AbandonedVehicleIcon
          : category == "blocked-path"
          ? BlockedRoadIcon
          : category == "litter"
          ? LitterIcon
          : VandalismIcon
      }
      eventHandlers={{ click: markerClickHandler }}
    />
  );
}
