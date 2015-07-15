Make Effective Data Visualization
=================================

Data Set
--------

https://www.kaggle.com/c/titanic/data

Summary
-------

Design
------


Feedbacks
---------

I showed `index2.html` to Gaurav, who had the following feedbacks:
* He did not realize at first that the red color meant non-survivors and blue
  meant survivors, which caused a lot of confusion. After explaining this to
  him, he got the impression that people with cheaper tickets are less likely to
  survive the crash (a lot of red at the bottom). He also realized (partly due
  to prior knowledge) that women are more likely to survive than men. I added
  some text at the bottom of the `svg` to explain the color scheme in order to
  avoid future confusion.
* He thought there were a lot of over-drawing at the bottom part of the plot,
  making it difficult to tell whether there were hidden survivors that were
  covered by non-survivors. To address this point, I reduce the size of each
  point, making it easier to see each individual.
* He suggested adding grid lines so that reader will be easily find the values
  of individual point. I incorporated this suggestion in `index3.html`.
* He also suggested using
  [gender symbols](https://en.wikipedia.org/wiki/Gender_symbol) instead of
  circles and squares to represent men and women, but I did not follow this
  suggestion because I think each point would be too small for reader to tell
  the small symbol differences.


References
----------
* [SVG Shapes](https://github.com/mbostock/d3/wiki/SVG-Shapes)
* [SVG Axes](https://github.com/mbostock/d3/wiki/SVG-Axes)
* [D3 Axes label](http://stackoverflow.com/questions/11189284/d3-axis-labeling)
* [D3 Legend](http://bl.ocks.org/ZJONSSON/3918369)
* [D3 tooltip](http://bl.ocks.org/weiglemc/6185069)
* [D3 tooltip](http://bl.ocks.org/Caged/6476579)
