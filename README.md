# SmartFarm
<img src="https://drive.google.com/uc?id=1pz1j2jA8nPay6dg6FUP1jkTQQmzpPcxO" alt="loading"><br>
Smart Farm is a crop management system that allots crops to farmers on the basis of the highest requirement crop predicted using machine learning from the crops that are suitable for their area according to the soil type, average rainfall etc. in their area, so that crops dont get wasted and, are produced accordingly. It consist of two apps a mobile app for the end-user i.e. the farmer, and a web-app for the admin.

# Table of Contents
* [Mobile app](#moblie-app)
* [Web app](#web-app)
* [Database](#database)
* [Machine learning](#ml)
* [Built with](#built-with)
* [Authors](#author)


# <a name="moblie-app"></a>Mobile app
  * In the mobile app the farmer will first need to enter all his details like name, aadhar no., mobile no., the land area he has in        hectares and his district and village.
  * After he enters all these details he is guided to a page where there are three tabs, in the first tab he is shown the crop that is suited for his area and currently has maximum requirement.
  * The second tab shows all the crops that can be grown in his area.
  * The third tab shows the soil type, average rainfall, soil texture and soil color in his area.
  * When the user presses the allot button he is alloted the given crop with an allotid and the requirement for that crop in the database is updated accordingly and, a sms is sent to him about the crop he is alloted with his allotid.
  * Next time the user opens the app he will only be shown his allot id, crop alloted and the other two tabs.
  
Mobile Application - <a href="https://play.google.com/store/apps/details?id=com.smartfarm.technetium">Google Play Store</a>  
<a href="https://github.com/prateek3255/smartfarm">Github repository</a>     


 # <a name="web-app"></a>Web app
The Web application is made up of three sections -
  * <b>Users</b>- It consists of all the details of the users who have registeres and the crop which is alloted to them.
  * <b>Crop requirement</b>- It consist of the current requirement of the crops in tonnes.
  * <b>Prediction</b>- It consist of the interactable plots predicted using machine learning.
  
Web application - <a href="https://smartfarm-18270.firebaseapp.com/">Website</a><br/>
<a href="https://github.com/prateek3255/smartFarmWebApp">Github repository</a>
    
  
# <a name="database"></a>Database
<p>The database is built on firebase and consist of two sections users and crops.

The users section consist of all the details the user enters when he registers, using aadhar no. as the key, whenever the user clicks the allot button, the alloted crop is also updated in his corresponding key.

The crops section consist of the requirement for all the crops in tonnes and whenever the user clicks allot button the amount of that crop that can be grown on his land area is subtracted from the requirement of that crop accordingly.</p> 
  
# <a name="ml"></a>Machine Learning
<p>We used the data from <a href="https://data.gov.in/node/87630">here</a> and used linear regression using year and area as features and the crop production as label.
  
The data we got consisted of all the production of all the districts of all the states from 1997 - 2010 and we then added the production and area of the crops we wanted to plot of rajasthan using pandas and created a new data csv named final.csv.
</p>
  
To view the interactive plots click on prediction section <a href="https://smartfarm-18270.firebaseapp.com/">here</a>.<br/>
<a href="https://github.com/prateek3255/SmartFarm_MachineLearning">Github repository</a>
 
# <a name="built-with"></a>Built with
* <a href="https://angularjs.org/">Angular JS</a> - Superheroic JavaScript MVW Framework
* <a href="http://ionicframework.com/">Ionic framework</a> - Build amazing native and hybrid mobile apps.
* <a href="https://firebase.google.com/">Firebase</a> - Used for Database, Storage and Hosting.
* Programming languages used -  python, HTML5, CSS3, JavaScript
* Python libraries used - <a href="https://pandas.pydata.org/">pandas</a>,<a href="http://scikit-learn.org/stable/modules/generated/sklearn.linear_model.LinearRegression.html"> scikitLearn(LinearRegression)</a>, <a href="https://matplotlib.org/">matplotlib</a>, <a href="http://mpld3.github.io/">mpl3d</a>
* SMS API used - <a href="https://www.garlicsms.com/">Garlic SMS</a>
* Training data - <a href="https://data.gov.in/node/87630">data.gov.in</a>

# <a name="author"></a>Authors
* <b>Prateek Surana   </b>
<a href="mailto:prateeksurana3255@gmail.com">Email</a>
* <b>Ayush Gupta   </b>
<a href="mailto:ayushgupta197@gmail.com">Email</a>
* <b>Vaibhav Sankhala   </b>
<a href="mailto:Vaibhavrocks0501@gmail.com">Email</a>
