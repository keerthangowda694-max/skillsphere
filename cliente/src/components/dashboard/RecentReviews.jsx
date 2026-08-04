const RecentReviews = ({ reviews = [] }) => (

    <div className="bg-white rounded-3xl shadow-xl p-6">
    
    <h2 className="text-xl font-bold mb-6">
    
    ⭐ Recent Reviews
    
    </h2>
    
    {
    reviews.length===0
    
    ?
    
    <p className="text-gray-500">
    
    No reviews yet.
    
    </p>
    
    :
    
    reviews.slice(0,3).map(review=>(
    
    <div
    key={review._id}
    className="border-b py-4"
    >
    
    <div className="flex justify-between">
    
    <h3 className="font-semibold">
    
    {review.client?.fullName}
    
    </h3>
    
    <span>
    
    ⭐ {review.overallRating}
    
    </span>
    
    </div>
    
    <p className="text-gray-600 mt-2">
    
    {review.comment}
    
    </p>
    
    </div>
    
    ))
    
    }
    
    </div>
    
    );
    
    export default RecentReviews;