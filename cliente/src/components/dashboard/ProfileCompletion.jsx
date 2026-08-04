const ProfileCompletion = ({ completion = 0 }) => (

    <div className="bg-white rounded-3xl shadow-xl p-6">
    
    <h2 className="text-xl font-bold mb-6">
    
    🎯 Profile Completion
    
    </h2>
    
    <div className="text-center">
    
    <div className="text-5xl font-bold text-blue-600">
    
    {completion}%
    
    </div>
    
    <div className="w-full bg-gray-200 rounded-full h-4 mt-6">
    
    <div
    
    className="bg-green-600 h-4 rounded-full"
    
    style={{
    
    width:`${completion}%`
    
    }}
    
    />
    
    </div>
    
    <p className="text-gray-500 mt-4">
    
    Complete your profile to improve visibility.
    
    </p>
    
    </div>
    
    </div>
    
    );
    
    export default ProfileCompletion;