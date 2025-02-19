import Image from "next/image";

// Server Component with Dynamic Data Fetching
export default async function TestPage() {
  try {
    const resLoginData = await fetch(
      "https://api.confidenceresellerbd.com/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Origin: "https://confidenceresellerbd.com",
          Referer: "https://confidenceresellerbd.com",
        },
        body: JSON.stringify({
          phoneNumber: "+8801708730727",
          password: "22222222",
        }),
        cache: "no-store",
      }
    );

    const loginData = await resLoginData.json();

    const response = await fetch(
      "https://api.confidenceresellerbd.com/product/?category_id=91&page=1&limit=500",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${loginData?.access}`,
          "Content-Type": "application/json",
          Origin: "https://confidenceresellerbd.com",
          Referer: "https://confidenceresellerbd.com",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 p-5 md:p-10 lg:p-20">
        {data?.results?.map((item: any, i: number) => {
          const productPrice = parseFloat(item?.reseller_price) * 1.33;
          const discountedPrice = parseInt(item?.reseller_price) * 1.38;

          return (
            <div
              key={i}
              className="rounded-md shadow-sm border border-gray-300 p-2 space-y-3 cursor-pointer"
            >
              <Image
                className="object-contain w-full h-[200px] rounded-md"
                src={item?.thumbnail || ""}
                alt={item?.name || "Product Image"}
                width={500}
                height={200}
              />
              <div className="space-y-2">
                <p>Product ID : {item?.id}</p>
                <p className="text-gray-700 font-semibold text-xl">
                  {item?.name}
                </p>
                <div
                  className="text-sm text-gray-500"
                  dangerouslySetInnerHTML={{ __html: item?.description }}
                />
                <p className="text-xl font-semibold text-gray-600">
                  {Math.ceil(productPrice)} BDT{" "}
                  <del className="text-gray-500">
                    {Math.ceil(discountedPrice)} BDT
                  </del>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    );
  } catch (error) {
    return <p className="text-red-500 text-center">Error: {error.message}</p>;
  }
}
