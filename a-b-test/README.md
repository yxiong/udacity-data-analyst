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

### Number of Samples vs. Power

http://www.evanmiller.org/ab-testing/sample-size.html

I decide not to use Bonferroni correction, because the metrics in the test has
high correlation and the Bonferroni correction will be too conservative to it.

Number of samples needed per branch

* Gross conversion: 25835 / 0.08 = 322937.5
* Retention: 39115 / 0.08 / 0.20625 = 2370606
* Net conversion: 27413 / 0.08 = 342662.5

Total number of samples needed: 2370606 * 2 = 4741212.

### Duration vs. Exposure


Experiment Analysis
-------------------

### Sanity Checks

#### Number of cookies

control group total: 345543
experiment group total: 344660
standard deviation: sqrt(0.5 * 0.5 / (345543 + 344660)) = 0.0006018
margin of error = 1.96 * 0.0006018 = 0.0011796


#### Number of clicks on "start free trial"

control group total: 28378
experiment group total: 28325
standard deviation: sqrt(0.5 * 0.5 / (28378 + 28325)) = 0.0021
margin of error = 1.96 * 0.0021 = 0.0041

#### Click-through-probability on "start free trial"

control value: 0.821258
standard deviation: sqrt(0.0821258 * (1-0.0821258) / 344660) = 0.000468
margin of error = 1.96 * 0.000468 = 0.00092

### Effect Size Tests

Pooled standard error

#### Gross conversion

    N_cnt = clicks_controlled = 17293.
    X_cnt = enroll_controlled = 3785.
    N_exp = clicks_experiment = 17260.
    X_exp = enroll_experiment = 3423.

    p_pooled = (X_cnt + X_exp) / (N_cnt + N_exp) = 0.2086
    se_pooled = sqrt(p_pooled * (1-p_pooled) * (1./N_cnt + 1./N_exp)) = 0.00437

    d = X_exp / N_exp - X_cnt / N_cnt = -0.02055


#### Retention

    N_cnt = enroll_controlled = 3785.
    X_cnt = pay_controlled = 2033.
    N_exp = enroll_experiment = 3423.
    X_exp = pay_experiment = 1945.

    p_pooled = (X_cnt + X_exp) / (N_cnt + N_exp) = 0.55189
    se_pooled = sqrt(p_pooled * (1-p_pooled) * (1./N_cnt + 1./N_exp)) = 0.01173

    d = X_exp / N_exp - X_cnt / N_cnt = 0.03109


#### Net conversion

    N_cnt = clicks_controlled = 17293.
    X_cnt = pay_controlled = 2033.
    N_exp = enroll_experiment = 17260.
    X_exp = pay_experiment = 1945.

    p_pooled = (X_cnt + X_exp) / (N_cnt + N_exp) = 0.1151
    se_pooled = sqrt(p_pooled * (1-p_pooled) * (1./N_cnt + 1./N_exp)) = 0.00343

    d = X_exp / N_exp - X_cnt / N_cnt = -0.0048

### Sign Tests


http://graphpad.com/quickcalcs/binomial1.cfm
