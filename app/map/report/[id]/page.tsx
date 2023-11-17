export default function ReportPage({ params }: { params: { id: string } }) {
  return <h1>Viewing report: {params.id}</h1>;
}
