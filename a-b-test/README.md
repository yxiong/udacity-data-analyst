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

I decide not to use Bonferroni correction, because the metrics in the test has
high correlation and the Bonferroni correction will be too conservative to it.

I calculate the number of samples needed for each metric using the
[online calculator](http://www.evanmiller.org/ab-testing/sample-size.html), with
`alpha = 0.05`, `1 - beta = 0.2`. The baseline conversion rate and minimum
detectable effect (`d_min`) are listed individually below:

* Gross conversion. The baseline conversion rate is 0.20625, and `d_min` is
  0.01. The required number of samples calculated from the online calculator
  is 25835. Note that this is the number of clicks on "start free trial", and
  in order to get that number, we need `25835 / 0.08 = 322938` page views.
* Retention. The baseline retention rate is 0.53, and `d_min` is 0.01. The
  required number of samples calculated from the online calculator
  is 39115. Note that this is the number of users who finished the 14 days free
  trial, and in order to get that number, we need `39115 / 0.08 / 0.20625 =
  2370606` page views.
* Net conversion. The baseline conversion rate is 0.1093125, and `d_min` is
  0.0075. The required number of samples calculated from the online calculator
  is 27413. Note that this is the number of clicks on "start free trial", and in
  order to get that number, we need `27413 / 0.08 = 342663` page views.

Take the maximum number of required page view, which is 2370606. Also note that
this is the number of page views needed per branch, and in order to do have both
control and experiment, we need to double this number. Therefore the total
number of page view needed is `2370606 * 2 = 4741212`.


### Duration vs. Exposure


Experiment Analysis
-------------------

### Sanity Checks

For counts ("number of cookies" and "number of clicks"), we model the assignment
to control and experiment group as a Bernoulli distribution with probability
0.5. Therefore the standard deviation is `std = sqrt(0.5 * 0.5 / (N_1 + N_2))`,
and the margin of error is `me = 1.96 * std`. The lower bound will be `0.5 - me`
and the higher bound will be `0.5 + me`. The actual observed value is number of
assignments to control group divide by the number of total assignments.

#### Number of cookies

    control group total = 345543
    experiment group total = 344660
    standard deviation = sqrt(0.5 * 0.5 / (345543 + 344660)) = 0.0006018
    margin of error = 1.96 * 0.0006018 = 0.0011796
    lower bound = 0.5 - 0.0011797 = 0.4988
    upper bound = 0.5 + 0.0011797 = 0.5012
    observed = 345543 / (345543 + 344660) = 0.5006

The observed value is within the bounds, and therefore this invariant metric
passed the sanity check.


#### Number of clicks on "start free trial"

    control group total = 28378
    experiment group total = 28325
    standard deviation = sqrt(0.5 * 0.5 / (28378 + 28325)) = 0.0021
    margin of error = 1.96 * 0.0021 = 0.0041
    lower bound = 0.5 - 0.0041 = 0.4959
    upper bound = 0.5 + 0.0041 = 0.5041
    observed = 28378 / (28378 + 28325) = 0.5005

The observed value is within the bounds, and therefore this invariant metric
passed the sanity check.

#### Click-through-probability on "start free trial"

For click through probability, we first compute the control value `p_cnt`, and
then estimate the standard deviation using this value with experiment group's
sample size, i.e. `std = sqrt(p_cnt * (1 - p_cnt) / N_exp)`. The margin of error
is 1.96 times of standard deviation.

    control value = 0.0821258
    standard deviation = sqrt(0.0821258 * (1-0.0821258) / 344660) = 0.000468
    margin of error = 1.96 * 0.000468 = 0.00092
    lower bound = 0.0821258 - 0.00092 = 0.0812
    upper bound = 0.0821258 + 0.00092 = 0.0830
    experiment value = 0.0821824

The observed value (experiment value) is within the bounds, and therefore this
invariant metric passed the sanity check.

### Effect Size Tests

Let `N` denote the number of total samples (denominator) and `X` denote the
number of target samples (numerator), and `_cnt` denote controlled group and
`_exp` the experiment group. We first computed pooled probability and pooled
standard error as

    p_pooled = (X_cnt + X_exp) / (N_cnt + N_exp)
    se_pooled = sqrt(p_pooled * (1-p_pooled) * (1./N_cnt + 1./N_exp))

The probability difference is computed as

    d = X_exp / N_exp - X_cnt / N_cnt

With these values in hand, the lower bound and upper bound are

    lower = d - se_pooled
    upper = d + se_pooled

#### Gross conversion

For gross conversion, the total samples (denominator) are the clicks of "start
free trial", and the target samples (numerator) are enrolled users. The
caculation is shown below.

    N_cnt = clicks_controlled = 17293.
    X_cnt = enroll_controlled = 3785.
    N_exp = clicks_experiment = 17260.
    X_exp = enroll_experiment = 3423.

    p_pooled = (X_cnt + X_exp) / (N_cnt + N_exp) = 0.2086
    se_pooled = sqrt(p_pooled * (1-p_pooled) * (1./N_cnt + 1./N_exp)) = 0.00437

    d = X_exp / N_exp - X_cnt / N_cnt = -0.02055

    lower = d - se_pooled = -0.0291
    upper = d - se_pooled = -0.0120

Since the interval does not contain 0, the metric is statistical significant. It
does not include `d_min = 0.01` or `-d_min = -0.01` either, and therefore it is
also practical significant.

#### Retention

For retention rate, the total samples (denominator) are enrolled users, and
the target samples (numerator) are paid users. The caculation is shown below.

    N_cnt = enroll_controlled = 3785.
    X_cnt = pay_controlled = 2033.
    N_exp = enroll_experiment = 3423.
    X_exp = pay_experiment = 1945.

    p_pooled = (X_cnt + X_exp) / (N_cnt + N_exp) = 0.55189
    se_pooled = sqrt(p_pooled * (1-p_pooled) * (1./N_cnt + 1./N_exp)) = 0.01173

    d = X_exp / N_exp - X_cnt / N_cnt = 0.03109

    lower = d - se_pooled = 0.0081
    upper = d + se_pooled = 0.0541

Since the interval does not contain 0, the metric is statistical significant. It
does include `d_min = 0.01` and therefore it is not practical significant.

#### Net conversion

For net conversion, the total samples (denominator) are the clicks of "start
free trial", and the target samples (numerator) are paid users. The caculation
is shown below.

    N_cnt = clicks_controlled = 17293.
    X_cnt = pay_controlled = 2033.
    N_exp = enroll_experiment = 17260.
    X_exp = pay_experiment = 1945.

    p_pooled = (X_cnt + X_exp) / (N_cnt + N_exp) = 0.1151
    se_pooled = sqrt(p_pooled * (1-p_pooled) * (1./N_cnt + 1./N_exp)) = 0.00343

    d = X_exp / N_exp - X_cnt / N_cnt = -0.0048

    lower = d - se_pooled = -0.0116
    upper = d + se_pooled = 0.0019

Since the interval contains 0, it is not statistical significant, and
consequently not practical significant either.

### Sign Tests

We use the [online calculator](http://graphpad.com/quickcalcs/binomial1.cfm) to
perform sign test.

* For gross conversion, the number of days we see an improvement in experiment
  group is 4, out of total 23 days of experiment. With probability 0.5 (for sign
  test), the online calculator calculates a p-value 0.0026, which is smaller than
  `alpha = 0.05`. Therefore the change is statistical significant.
* For retention rate, the number of days we see an improvement in experiment
  group is 13, out of total 23 days of experiment. With probability 0.5 (for sign
  test), the online calculator calculates a p-value 0.6776, which is larger than
  `alpha = 0.05`. Therefore the change is not statistical significant.
* For net conversion, the number of days we see an improvement in experiment
  group is 10, out of total 23 days of experiment. With probability 0.5 (for sign
  test), the online calculator calculates a p-value 0.6776, which is larger than
  `alpha = 0.05`. Therefore the change is not statistical significant.


### Summary


### Recommendation


Follow-Up Experiment
--------------------
