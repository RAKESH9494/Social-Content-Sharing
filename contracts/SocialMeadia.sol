// SPDX-License-Identifier:MIT
pragma solidity ^0.8.1;
contract SocialMeadia{
    address payable ADMIN;
    constructor(){
        ADMIN = payable(msg.sender);
    }
    modifier OnlyAdmin{
        require(msg.sender == ADMIN);
        _;
    }
    struct User{
        string FName;
        string LName;
        string profilePic;
        address owner;
        uint timestamp;
        string password;
        string[] postsUrl;
        string[] Text;
        string[] VideosUrl;
    }
    User[] Users;
    // Posts about photos
    struct Photosfeed{
        uint timestamp;
        string url;
        string photoDiscription;
        address owner;
    }    
    Photosfeed[] GlobalPhotosFeed;
    // posts about text
    struct textfeed{
        uint timestamp;
        string text;
        address owner;
    }
    textfeed[] GlobaltextFeed;
    // posts about videos
    struct videosfeed{
        uint timestamp;
        string url;
        address owner;
        string VideosDiscription;
    } 
    videosfeed[] GlobalVideoFeed;
    function Login(address userKey,string memory password) public view returns(bool){
        require(checksignup(userKey),"User Not Found");
        for(uint i=0;i<Users.length;i++){
            if(Users[i].owner == userKey && keccak256(abi.encodePacked(Users[i].password)) == keccak256(abi.encodePacked(password))){
                return true;
            }
        }
        return false;
    }
    function checksignup(address pubkey) public view returns(bool){
        for(uint i=0;i<Users.length;i++){
            if(Users[i].owner == pubkey){
                return true;
            }
        }
        return false;
    }
    function SignUp(string memory FirstName,string memory LastName,string memory Profile,address userKey,string memory password) public payable{
        require(checksignup(userKey)==false,"You have already SignUp");
        require(msg.value >0,"please pay 0 Gwi");
        ADMIN.transfer(msg.value);
        Users.push(User({
            FName : FirstName,
            profilePic : Profile,
            LName : LastName,
            owner : userKey,
            timestamp : block.timestamp,
            password : password,
            postsUrl : new string[](0),
            Text : new string[](0),
            VideosUrl : new string[](0)
        }));
    }
    //Make a Image post
    function POstImage(string memory url,address pubkey,string memory Discription) public payable {
        require(msg.value > 1,"please pay 1 Gwi");
        ADMIN.transfer(msg.value);
        GlobalPhotosFeed.push(Photosfeed(block.timestamp,url,Discription,pubkey));
        for(uint i=0;i<Users.length;i++){
            if(pubkey == Users[i].owner){
                Users[i].postsUrl.push(Discription);
            }
        }
    }
    //Getting Global Image Data
    function GetDataImages()public view returns(Photosfeed[] memory){
        return GlobalPhotosFeed;
    }
    //Make a Text post
    function PostText(string memory Data,address pubkey) public payable{
        require(msg.value > 1,"please pay 1 Gwi");
        ADMIN.transfer(msg.value);
        GlobaltextFeed.push(textfeed(block.timestamp,Data,pubkey));
        for(uint i=0;i<Users.length;i++){
            if(pubkey == Users[i].owner){
                Users[i].Text.push(Data);
            }
        }
    }
    //Getting Global Text data
    function GetTextData() public view returns(textfeed[] memory){
        return GlobaltextFeed;
    }
    //make a Videos post
    function PostVideos(string memory url,address pubkey,string memory Description)public payable{
      require(msg.value > 1,"please pay 1 Gwi");
      ADMIN.transfer(msg.value);
      GlobalVideoFeed.push(videosfeed(block.timestamp,url,pubkey,Description));  
       for(uint i=0;i<Users.length;i++){
            if(pubkey == Users[i].owner){
                Users[i].VideosUrl.push(Description);
            }
        }
    }
    //Getting Videos Data
    function GetGlobalVideos() public view returns(videosfeed[] memory){
        return GlobalVideoFeed;
    }
    //Getting UserData
    function GettingUserData() public view returns(User[] memory){
        return Users;
    }
    //Delete User By Admin
    function DeleteUser(address UserKey) public  OnlyAdmin{
        require(checksignup(UserKey),"User Not Found");
        uint index;
        for(uint i=0;i<Users.length;i++){
            if(UserKey == Users[i].owner){
                    index = i;
            }
        }
        for(uint i = index; i < Users.length - 1; i++) {
            Users[i] = Users[i + 1];
        }
        // Remove the last element
        delete Users[Users.length - 1];
        // Decrease the length
        Users.pop();
    }
    //Edit Profile
    function EditProfile(address pubkey,string memory FirstName,string memory LastName,string memory password)public{
        for(uint i=0;i<Users.length;i++){
            if(pubkey == Users[i].owner){
                Users[i].FName = FirstName;
                Users[i].LName = LastName;
                Users[i].password = password;
            }
        }
    }
    //DeleteImages
    function DeleteImages(string memory imageUrl)public{
    //delete posts at User side
        uint UserIndex;
        uint ImgIndex;
        for(uint i=0;i<Users.length;i++){
            for(uint j=0;j<Users[i].postsUrl.length;j++){
                if(keccak256(abi.encodePacked(imageUrl))==keccak256(abi.encodePacked(Users[i].postsUrl[j])) ){
                    UserIndex=i;
                    ImgIndex=j;
                }
            }
        }
        for(uint i = ImgIndex; i < Users[UserIndex].postsUrl.length - 1; i++) {
            Users[UserIndex].postsUrl[i] = Users[UserIndex].postsUrl[i+1];
        }
        // Remove the last element
        delete Users[UserIndex].postsUrl[Users[UserIndex].postsUrl.length-1];
        // Decrease the length
        Users[UserIndex].postsUrl.pop();
    //Deleting AT Global Feed
    uint index;
        for(uint i=0;i<GlobalPhotosFeed.length;i++){
            if(keccak256(abi.encodePacked(GlobalPhotosFeed[i].url)) == keccak256(abi.encodePacked(imageUrl))){
                    index=i;
            }
        }
        for(uint i = index; i < GlobalPhotosFeed.length - 1; i++) {
            GlobalPhotosFeed[i] = GlobalPhotosFeed[i + 1];
        }
        // Remove the last element
        delete GlobalPhotosFeed[GlobalPhotosFeed.length - 1];
        // Decrease the length
        GlobalPhotosFeed.pop();
    }
    //Delete Videos
    function DeleteVideos(string memory VideoUrl) public{
    //delete posts at User side
        uint UserIndex;
        uint VideoIndex;
        for(uint i=0;i<Users.length;i++){
            for(uint j=0;j<Users[i].VideosUrl.length;j++){
                if(keccak256(abi.encodePacked(VideoUrl))==keccak256(abi.encodePacked(Users[i].VideosUrl[j])) ){
                    UserIndex=i;
                    VideoIndex=j;
                }
            }
        }
        for(uint i = VideoIndex; i < Users[UserIndex].VideosUrl.length - 1; i++) {
            Users[UserIndex].VideosUrl[i] = Users[UserIndex].VideosUrl[i+1];
        }
        // Remove the last element
        delete Users[UserIndex].VideosUrl[Users[UserIndex].VideosUrl.length-1];
        // Decrease the length
        Users[UserIndex].VideosUrl.pop();
    //Deleting AT Global Feed
    uint index;
        for(uint i=0;i<GlobalVideoFeed.length;i++){
            if(keccak256(abi.encodePacked(GlobalVideoFeed[i].url)) == keccak256(abi.encodePacked(VideoUrl))){
                    index=i;
            }
        }
        for(uint i = index; i < GlobalVideoFeed.length - 1; i++) {
            GlobalVideoFeed[i] = GlobalVideoFeed[i + 1];
        }
        // Remove the last element
        delete GlobalVideoFeed[GlobalVideoFeed.length - 1];
        // Decrease the length
        GlobalVideoFeed.pop();
    }
    //Deleting Text
    function DeletingTExt(address pubkey,uint index)public{
        //At owner side
        uint UserIndex;
        uint textIndex;
        for(uint i=0;i<Users.length;i++){
            if(pubkey == Users[i].owner){
                UserIndex = i;
                textIndex = index;
            }
        }
        for(uint i = textIndex; i < Users[UserIndex].Text.length - 1; i++) {
            Users[UserIndex].Text[i] = Users[UserIndex].Text[i+1];
        }
        // Remove the last element
        delete Users[UserIndex].Text[Users[UserIndex].Text.length-1];
        // Decrease the length
        Users[UserIndex].Text.pop();
    // At global Data
    uint Gindex ;
        for(uint i=0;i<GlobaltextFeed.length;i++){
            if(keccak256(abi.encodePacked(Users[UserIndex].Text[textIndex]))==keccak256(abi.encodePacked(GlobaltextFeed[i].text))){
                Gindex = i;
            }
        }
        for(uint i = Gindex; i < GlobaltextFeed.length - 1; i++) {
            GlobaltextFeed[i] = GlobaltextFeed[i + 1];
        }
        // Remove the last element
        delete GlobaltextFeed[GlobaltextFeed.length - 1];
        // Decrease the length
        GlobaltextFeed.pop();
    }
}