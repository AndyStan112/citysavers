import OverlayPage from "@/components/OverlayPage/OverlayPage";

export default function ViewIssuePage({ params }: { params: { id: string } }) {
  return (
    <OverlayPage>
      <h2>Viewing issue id: {params.id}</h2>
    </OverlayPage>
  );
}
