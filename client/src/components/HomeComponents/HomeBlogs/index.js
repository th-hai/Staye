import React from 'react';

const HomeBlogs = () => {
	return (
		<section className="relative w-full bg-white">
			<div className="absolute w-full h-32 bg-gradient-to-b from-gray-100 to-white" />
			<div className="relative w-full px-5 py-10 mx-auto sm:py-12 md:py-16 md:px-10 max-w-7xl">
				<h1 className="mb-1 text-4xl font-extrabold leading-none text-gray-900 lg:text-5xl xl:text-6xl sm:mb-3"><a href="#_">Discover More</a></h1>
				<div className="flex grid h-full grid-cols-12 gap-10 pb-10 mt-8 sm:mt-16">
					<div className="grid grid-cols-12 col-span-12 gap-7">
						<div className="flex flex-col items-start col-span-12 overflow-hidden shadow-sm rounded-xl md:col-span-6 lg:col-span-4">
							<a href="https://inspiredbymaps.com/hong-kong-travel-guide/" className="block transition duration-200 ease-out transform hover:scale-110">
								<img className="object-cover w-full shadow-sm max-h-56" src="https://travel.luxstay.com/wp-content/uploads/2021/08/10-things-to-experience-enough-to-make-a-trip-to-750x536.jpeg" />
							
							<div className="relative flex flex-col items-start px-6 bg-white border border-t-0 border-gray-200 py-7 rounded-b-2xl">
								<div className="bg-indigo-400 absolute top-0 -mt-3 flex items-center px-3 py-1.5 leading-none w-auto inline-block rounded-full text-xs font-medium uppercase text-white inline-block">
									<span>Inspiration</span>
								</div>
								<h2 className="text-base font-bold sm:text-lg md:text-xl"><a href="https://inspiredbymaps.com/hong-kong-travel-guide/">10 things to experience enough to make a trip to Hong Kong worth every penny
</a></h2>
								<p className="mt-2 text-sm text-gray-500">Hong Kong, is one of the favorite places of many travel enthusiasts. This is a vibrant city, full of life,...</p>
							</div>
							</a>
						</div>
						<div className="flex flex-col items-start col-span-12 overflow-hidden shadow-sm rounded-xl md:col-span-6 lg:col-span-4">
							<a href="https://www.insuremytrip.com/travel-advice/travel-tips/rainy-season-travel-tips/" className="block transition duration-200 ease-out transform hover:scale-110">
								<img className="object-cover w-full shadow-sm max-h-56" src="https://travel.luxstay.com/wp-content/uploads/2021/08/Pocket-4-tips-when-traveling-in-the-rainy-season-750x536.jpg" />
							
							<div className="relative flex flex-col items-start px-6 bg-white border border-t-0 border-gray-200 py-7 rounded-b-2xl">
								<div className="bg-red-400 absolute top-0 -mt-3 flex items-center px-3 py-1.5 leading-none w-auto inline-block rounded-full text-xs font-medium uppercase text-white inline-block">
									<span>Food</span>
								</div>
								<h2 className="text-base font-bold sm:text-lg md:text-xl"><a href="https://www.insuremytrip.com/travel-advice/travel-tips/rainy-season-travel-tips/">Pocket 4 tips when traveling in the rainy season</a></h2>
								<p className="mt-2 text-sm text-gray-500">Many people choose the low tourist months because they often have cheap room rates, airfares and accompanying service prices are...</p>
							</div>
							</a>
						</div>
						<div className="flex flex-col items-start col-span-12 overflow-hidden shadow-sm rounded-xl md:col-span-6 lg:col-span-4">
							<a href="https://scootersaigontour.com/5-best-crab-noodle-soup-in-ho-chi-minh-city/" className="block transition duration-200 ease-out transform hover:scale-110">
								<img className="object-cover w-full shadow-sm max-h-56" src="https://travel.luxstay.com/wp-content/uploads/2021/08/4-attractive-affordable-crab-noodle-shops-in-Binh-Thanh-district-750x536.jpg" />
							
							<div className="relative flex flex-col items-start px-6 bg-white border border-t-0 border-gray-200 py-7 rounded-b-2xl">
								<div className="bg-purple-500 absolute top-0 -mt-3 flex items-center px-3 py-1.5 leading-none w-auto inline-block rounded-full text-xs font-medium uppercase text-white inline-block">
									<span>Resources</span>
								</div>
								<h2 className="text-base font-bold sm:text-lg md:text-xl"><a href="https://scootersaigontour.com/5-best-crab-noodle-soup-in-ho-chi-minh-city/">4 attractive, affordable crab noodle shops in Binh Thanh district</a></h2>
								<p className="mt-2 text-sm text-gray-500">Mr. Kitchen - Crab Soup & Crab Soup The first suggestion is Mr.Kitchen - a place that sells delicious crab cakes and attracts a lot of people to enjoy. Afternoon...</p>
							</div>
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HomeBlogs;
