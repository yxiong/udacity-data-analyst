A/B Testing Final Project
=========================


Metric Choice
-------------

* Number of cookies: invariant metric. The number of users that visit the
  website should not vary as we change the rendering of "start free trial" page,
  because the users have not seen that page before they decide to visit the
  page. Therefore, it is an invariant metric in our A/B test.

* Number of user-ids: neither invariant nor evaluation metric. The number of
  users that registered for classes will increase with time, and therefore it is
  not an invariant metric. It is neither a good candidate for evaluation metric,
  because the total number contains registered user from both the control and
  experiment groups.

* Number of clicks: invariant metric. Similar to number of cookies, this metric
  does not depend on how we render the "start free trial" page, because the
  clicked users have not seen that page before they decide to click the button.

* Click-through-probability: invariant metric. Again, since the users have not
  seen the page we tested on before they decide to click the button, the
  click-through-probability also does not depend on our test and is a good
  invariant metric.

* Gross conversion: evaluation metric. The numbers of users who decide to start
  the free trial are expected to depend on how the "start free trial" page is
  rendered --- whether a "5 or more hours per week" is suggested --- this is one
  question we would like to understand through this A/B test. Therefore, this is
  a good evaluation metric.

* Retention: evaluation metric. Similarly, we would like to understand whether
  rendering a "5 or more hours per week" suggestion is helpful to increase ratio
  of users who make payments over those who finish the free trial, and therefore
  this metric is good for evaluation.

* Net conversion: evaluation metric. The net conversion is the product of
  previous two evaluation metrics: gross conversion and retention, and it can be
  considered as a more general goal of the A/B test --- whether rendering a "5
  or more hours per week" suggestion helps increase the ratio of users who make
  payment over those who see the start free trial page. Therefore it is also a
  good evaluation metric.



Measuring Variability
---------------------

For Bernoulli distribution with probability `p` and population `N`, the
analytical standard deviation is computed as `std = sqrt(p * (1-p) / N)`.

### Gross conversion

The baseline probability for gross conversion is `p = 0.20625`, and the number
of users who see the "start free trial" page (the denominator of the gross
conversion) is `N = 5000 * 0.08 = 400`. Therefore the standard deviation is `std
= sqrt(p * (1-p) / N) = 0.0202`.

### Retention

The baseline retention rate is `p = 0.53`, and the number of users who enrolled
the free trial (the denominator of the retention rate) is
`N = 5000 * 0.08 * 0.20625 = 82.5`. Therefore the standard deviation is
`std = sqrt(p * (1-p) / N) = 0.0549`.

### Net conversion

The baseline net conversion rate is `p = 0.1093125`, and the number of users who
see the "start free trial" page (the denominator of the net conversion) is
`N = 5000 * 0.08 = 400`. Therefore the standard deviation is
`std = sqrt(p * (1-p) / N) = 0.0156`.



Sizing
------

Need Bonferroni correction because multiple hypothesis are tested.

Gross conversion
25835 / 0.08 = 322937.5
39115 / 0.08 / 0.20625 = 2370606
27413 / 0.08 = 342662.5

2%

33014 / 0.08
50013 / 0.08 / 0.20625 = 3031091

1%

58199 / 0.08 / 0.20625 = 3527212

http://www.evanmiller.org/ab-testing/sample-size.html
