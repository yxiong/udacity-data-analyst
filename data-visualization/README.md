Make Effective Data Visualization
=================================

Data Set
--------

We use the Titanic dataset accessed from
[kaggle](https://www.kaggle.com/c/titanic/data). We use the training dataset
`train.csv` because it contains all the information we need, especially whether
the passenger survived or not.

Summary
-------

Each passenger is shown as a point in the graph, with survivors colored in blue
and non-survivors colored in red. The female passengers are drawn with circles
and male passengers with squares. You can use the checkbox to show or hide each
group of passengers, and hovering mouse on each point will show detailed
passenger information.

Design
------

In this project we would like to visualize the survivorship of Titanic
passengers with respect to their gender, age and wealth (measured by ticket
fare). There are four variables in total: two of them are continuous (age and ticket
fare), while the other two binary (gender and survivor).

Since we would like to visualize individual passengers, and there are not so
many of them (several hundred in our dataset), I decide to use a scatter
plot. The advantage of this is that viewers can see each point, and also click
them and get even more detailed information about this individual.

The natural way to encode the continuous variable is to use `x` and `y` axes,
and we put `age` in `x` axis and `ticket fare` in `y` axis. Since there is a
large variation of the ticket fare, and a lot of them are between 3 and 20 while
the highest fare over 500, I use a log-scale for `y` axis.

I use color to encode the survivorship, and as Yannis suggested (see below),
green for survivor and red for non-survivor is an intuitive encoding and
contains good contrast. For gender, I use different shapes: square for male and
circle for female. In order to increase contrast, I make squares solid and
circle empty-centered, althought Weiyi still thinks the contrast is not strong
enough (see below). I created legend for each of the four types (female
survived, female not survived, male survived and male not survived), and allow
users show or hide each group with checkboxes.

An point I observed and would like to convey through this visualization is
survivorship is strongly related to gender, modestly related to ticket fare, and
almost not related to the age.

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
* He suggested adding more dynamic features, for example, allowing user to hide
  certain groups in order to avoid cluttering. I added this feature in
  `index4.html`.
* He suggested adding grid lines so that reader will be easily find the values
  of individual point. I incorporated this suggestion in `index3.html`.
* He also suggested using
  [gender symbols](https://en.wikipedia.org/wiki/Gender_symbol) instead of
  circles and squares to represent men and women, but I did not follow this
  suggestion because I think each point would be too small for reader to tell
  the small symbol differences.


I showed `index3.html` to Yannis, who had the following feedbacks:
* At the first impression, he realized a large bulk of red squares at the lower
  part of the graph, suggesting there are many "less-previliged" males who did
  not survive the crash. He also noticed the blue circles almost everywhere,
  meaning the female passengers are mostly survived, despite of their ticket
  fare. These observations agree with his prior knowledge and intuition.
* He also noticed there is a large number of passengers at the leftmost column
  (with age 0), with mix of social classes (ticket fare) and survival rates. He
  thought this was hard to interpret, possible indicating there were large
  number of babies on board. I later relized that this was caused by a bug of my
  code --- I tried to remove passengers that does not have an age attribute with
  `isNaN(data[i]["Age"])`, which does not work because `data[i]["Age"]` is `""`
  and the previous test always returns `false`. The right test should be
  `data[i]["Age"] == ""`. I fixed this in `index4.html`.
* He suggested using green color to indicate survivors, which is more intuitive
  and has better contrast with red. I made this change in `index4.html`.
* Same as Gaurav, he thought there were too much clutter in the visualization
  and suggest I created options enabling users to hide cetain groups, so that
  they can see particular group of interest more clearly. I made the change in
  `index4.html`.


I showed `index4.html` to Weiyi, who had the following feedbacks:
* She got the impression that females tend to survive more than males. For
  females, the survivorship is related to the ticket fare: those with higher
  ticket fares are even more likely to survive, and those with lower ticket
  fares are relatively less likely. This relationship is less obvious for males:
  they are unlikely to survive despite the ticket fares.
* She thought the contrast of symbols for different genders are not high
  enough. For example, when showing all the survivors, the males and females do
  not look very different. I understand her point, but currently have not found
  a better way to boost the contrast. I tried to use different symbols or making
  the symbols different sizes, but they do not seem to help.
* She suggested adding some summarization of data in different region. For
  example, she is interested in how many female v.s. male survivors whose ticket
  fares between 10 and 50, and it is hard to count in the current
  visualization. I think a separate histogram might be able to show this
  information, but do not know how to integrate with the scatter plot yet. I
  leave this as an interesting direction of future work for this project.


References
----------

* `d3.v3.min.js` is accessed from http://d3js.org/d3.v3.min.js
* `d3.tip.v0.6.3.js` is accessed from http://labratrevenge.com/d3-tip/javascripts/d3.tip.v0.6.3.js
* [SVG Shapes](https://github.com/mbostock/d3/wiki/SVG-Shapes)
* [SVG Axes](https://github.com/mbostock/d3/wiki/SVG-Axes)
* [D3 Axes label](http://stackoverflow.com/questions/11189284/d3-axis-labeling)
* [D3 Legend](http://bl.ocks.org/ZJONSSON/3918369)
* [D3 tooltip](http://bl.ocks.org/weiglemc/6185069)
* [D3 tooltip](http://bl.ocks.org/Caged/6476579)
* [Grouped Bar Chart](http://bl.ocks.org/mbostock/3887051/)
