import SingleProject from "@/components/SingleProject"

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return (<div>
    <SingleProject id={id} />
  </div>)
}