A/B Testing Final Project
=========================


Metric Choice
-------------

* Number of cookies: invariant metric.

* Number of user-ids: neither invariant nor evaluation metric.

* Number of clicks: invariant metric.

* Click-through-probability: invariant metric.

* Gross conversion: evaluation metric.

* Retention: evaluation metric.

* Net conversion: evaluation metric.



Measuring Variability
---------------------

Var = sqrt(p * (1-p) / N)

### Gross conversion

p = 0.20625
N = 5000 * 0.08
Var = 0.0202

### Retention

p = 0.53
N = 5000 * 0.08 * 0.20625
Var = 0.0549

### Net conversion

p = 0.1093125
N = 5000 * 0.08
Var = 0.0156



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
