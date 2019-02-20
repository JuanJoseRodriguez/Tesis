![UFF Image](http://fs5.directupload.net/images/170302/d5zleuc5.png)
# UFFRemover Server

UFFRemover Server is a implementation of the slimming JavaScript tool UFFRemover for identifying and removing unused foreign functions (UFF).

## Installation

UFFRemover Server is developed using Node.js. The following steps are needed for running the tool:

#### 1. Install MEAN Stack in a server.
    MEAN Stack information can be found here (http://mean.io/)

#### 2. Download the project in the from github

    git clone https://github.com/JuanJoseRodriguez/Tesis.git
    cd Tesis

#### 3. Install the project dependencies

    npm install
    
#### 4. Run the node server

    node sever.js
    
## Optimization

#### 1. Get a project to optimize

> If you don't have one, you can try downloading the Math.js experiment example from https://github.com/hcvazquez/ExperimentExample

#### 2. Upload the file to instrument

Select the JS file and click "Instrument" button.

> This step dowloads a new file, instrumentedfile.js

In math.js example:

![Image](https://s17.directupload.net/images/190220/fdxkzwcj.png)

#### 3. Replace original file with instrumented file

To generate profiling info you need to replace in your site the original file with the instrumented file.

For Example:

Replace

	<script src="math.js"></script>
  
With

	<script src="instrumentedfile.js"></script>
  
#### 4. Generate profiling info

You need to run your application and use it. This step print profiling information about used functions into the browser console.

#### 5. Save the browser console output into a file

For this step, you need to open the browser console and save the content into a txt file.

> Note: In Chrome, please check that "info" logging level is enable. ![image](https://github.com/hcvazquez/UFFRemover/blob/master/experiment/img/hide_all.png)

In math.js example:

![image](https://github.com/hcvazquez/UFFRemover/blob/master/experiment/img/profiling.png)

#### 6. Now, you can use the registered information to optimize your application

How the optimizations works?
The optimization removes the UFFs functions from the js file optimized. All the functions removed are saved in the sever.

> Note: The file to optimize needs to be the original file.

You can optimize your original file as follow.

In math.js example:
Select the js file to optimize and the profiling.txt generated with the console info. Then, click "Upload" button.

![image](https://s15.directupload.net/images/190220/m5yj32y2.png)

> Note: After the optimization, you can get the url of the file optimized from the console

![image](https://s15.directupload.net/images/190220/pgbpqkgl.png)

#### 7. Test your optimizated file

To test your optimized file you need to replace in your site the original file with the url given in the previous step.


For Example:

Replace

	<script src="math.js"></script>

With

	<script src="http://13.59.133.10:3000/api/filesuffId/5c6dd39f5896c02219bdafad"></script>

> CONGRATULATIONS! The app is optimized! Now it will adjust the content of the js files automatically.
