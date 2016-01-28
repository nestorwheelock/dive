var dive = require('../scuba-dive.js');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports['feetToMeters'] = {
    setUp: function(done) {
        done();
    },
    'no args': function(test) {
        test.expect(1);
        test.equal(dive.feetToMeters(), 0.3048, 'should be standard 1m -> 3.2808ft');
        test.done();
    },
    '1 arg': function(test) {
        test.expect(1);
        test.equal(dive.feetToMeters(33), 10.0584, 'should be standard 33ft -> 10.0584m');
        test.done();
    }
};

exports['metersToFeet'] = {
    setUp: function(done) {
        done();
    },
    'no args': function(test) {
        test.expect(1);
        test.equal(dive.metersToFeet(), 3.28084, 'should be standard 1m -> 3.2808ft');
        test.done();
    },
    '1 arg': function(test) {
        test.expect(1);
        test.equal(dive.metersToFeet(10), 32.8084, 'should be standard 32.8084ft -> 10m');
        test.done();
    }
};
exports['dac'] = {
    setUp: function(done) {
        done();
    },
    'args': function(test) {
        test.expect(1);
        test.equal(dive.dac(2500, 1300, 50), 24, 'should be 24 psi/min');
        test.done();
    }
};

exports['atmToDepthInMeters'] = {
    setUp: function(done) {
        done();
    },
    '10.03 meters': function(test) {
        test.expect(3);
        dive.gravitySamples.current(dive.gravitySamples.earth);
        dive.surfacePressureSamples.current(dive.surfacePressureSamples.earth);
        test.equal(dive.gravitySamples.current(), 9.80665, 'should be 9.8 m/s2 on earth as gravity default');
        test.equal(dive.surfacePressureSamples.current(), 1, 'should be 1 bar on earth as surface pressure default');
        var depth = Math.round(dive.atmToDepthInMeters() * 100) / 100;
        test.equal(depth, 10.03, 'should be 10.03 meters equal 1atm below sea level on earth in salt water');
        test.done();
    },
    '10.33 meters fresh water': function(test) {
        test.expect(3);
        dive.gravitySamples.current(dive.gravitySamples.earth);
        dive.surfacePressureSamples.current(dive.surfacePressureSamples.earth);
        test.equal(dive.gravitySamples.current(), 9.80665, 'should be 9.8 m/s2 on earth as gravity default');
        test.equal(dive.surfacePressureSamples.current(), 1, 'should be 1 bar on earth as surface pressure default');
        var depth = Math.round(dive.atmToDepthInMeters(1, true) * 100) / 100;
        test.equal(depth, 10.33, 'should be 10.33 meters equal 1atm below sea level on earth in fresh water');
        test.done();
    }
};

exports['barToDepthInMeters'] = {
    setUp: function(done) {
        done();
    },
    '9.9 meters': function(test) {
        test.expect(3);
        dive.gravitySamples.current(dive.gravitySamples.earth);
        dive.surfacePressureSamples.current(dive.surfacePressureSamples.earth);
        test.equal(dive.gravitySamples.current(), 9.80665, 'should be 9.8 m/s2 on earth as gravity default');
        test.equal(dive.surfacePressureSamples.current(), 1, 'should be 1 bar on earth as surface pressure default');
        var depth = Math.round(dive.barToDepthInMeters() * 100) / 100;
        test.equal(depth, 9.9, 'should be 9.9 meters equal 1 bars below sea level on earth in salt water');
        test.done();
    },
    '10.2 meters fresh': function(test) {
        test.expect(3);
        dive.gravitySamples.current(dive.gravitySamples.earth);
        dive.surfacePressureSamples.current(dive.surfacePressureSamples.earth);
        test.equal(dive.gravitySamples.current(), 9.80665, 'should be 9.8 m/s2 on earth as gravity default');
        test.equal(dive.surfacePressureSamples.current(), 1, 'should be 1 bar on earth as surface pressure default');
        var depth = Math.round(dive.barToDepthInMeters(1, true) * 100) / 100;
        test.equal(depth, 10.2, 'should be 10.2 meters equal 1 bars below sea level on earth in fresh');
        test.done();
    }
};

exports['depthInMetersToBars'] = {
    setUp: function(done) {
        done();
    },
    '10 meters': function(test) {
        test.expect(3);
        dive.gravitySamples.current(dive.gravitySamples.earth);
        dive.surfacePressureSamples.current(dive.surfacePressureSamples.earth);
        test.equal(dive.gravitySamples.current(), 9.80665, 'should be 9.8 m/s2 on earth as gravity default');
        test.equal(dive.surfacePressureSamples.current(), 1, 'should be 1 bar on earth as surface pressure default');
        var bars = Math.round(dive.depthInMetersToBars(10));
        test.equal(bars, 2, 'should be 10 meters equal 2 bars');
        test.done();
    }
};

exports['pascalToBar'] = {
    setUp: function(done) {
        done();
    },
    '100000 to 1 bar': function(test) {
        test.expect(1);
        test.equal(dive.pascalToBar(100000), 1, 'should be 1 bar to 100000 pascals');
        test.done();
    }
};

exports['barToPascal'] = {
    setUp: function(done) {
        done();
    },
    '100000 to 1 bar': function(test) {
        test.expect(1);
        test.equal(dive.barToPascal(1), 100000, 'should be 1 bar to 100000 pascals');
        test.done();
    }
};

exports['pascalToAtm'] = {
    setUp: function(done) {
        done();
    },
    '101325 to 1 atm': function(test) {
        test.expect(1);
        test.equal(dive.pascalToAtm(101325), 1, 'should be 1 atm to 101325 pascals');
        test.done();
    }
};

exports['atmToPascal'] = {
    setUp: function(done) {
        done();
    },
    '101325 to 1 atm': function(test) {
        test.expect(1);
        test.equal(dive.atmToPascal(1), 101325, 'should be 1 atm to 101325 pascals');
        test.done();
    }
};

exports['atmToBar'] = {
    setUp: function(done) {
        done();
    },
    '1.01325 to 1 atm': function(test) {
        test.expect(1);
        test.equal(dive.atmToBar(1), 1.01325, 'should be 1 atm to 1.01325 bar');
        test.done();
    }
};

exports['depthInMetersToAtm'] = {
    setUp: function(done) {
        done();
    },
    '10 meters': function(test) {
        test.expect(3);
        dive.gravitySamples.current(dive.gravitySamples.earth);
        dive.surfacePressureSamples.current(dive.surfacePressureSamples.earth);
        test.equal(dive.gravitySamples.current(), 9.80665, 'should be 9.8 m/s2 on earth as gravity default');
        test.equal(dive.surfacePressureSamples.current(), 1, 'should be 1 bar on earth as surface pressure default');
        var atm = Math.round(dive.depthInMetersToAtm(10));
        test.equal(atm, 2, 'should be 10 meters equal 1atm below sea level on earth');
        test.done();
    }
};

exports['sac'] = {
    setUp: function(done) {
        done();
    },
    '1 atm sac rate': function(test) {
        test.expect(2);
        var dac = dive.dac(2500, 1300, 50);
        test.equals(dac, 24, 'should be 24 psi/min');
        var sac = dive.sac(dac, 10);
        sac = Math.floor(sac);
        test.equals(sac, 12, 'should be 12 psi/min');
        test.done();
    }
};

exports['rmv'] = {
    setUp: function(done) {
        done();
    },
    'cubic feet per minute': function(test) {
        test.expect(1);
        var sac = 25; // 25 psi/min
        // diving with 80cubic feet working pressure 3000
        var rmv = Math.round(dive.rmv(sac, 80, 3000) * 100)/100;
        test.equals(rmv, 0.67, 'should be 0.67 cuft/min');
        test.done();
    }
};

exports['partialPressure'] = {
    setUp: function(done) {
        done();
    },
    'partial pressure in bar absolute for gas volume fraction': function(test) {
        test.expect(3);
        // diving with a tank that has 79% nitrogen and 21% oxygen
        // to 10 meters below sea level (or approximately 2 bar absolute)

        var barAbs = dive.depthInMetersToBars(10);
        test.equals(Math.round(barAbs), 2, '10 meters should be about 2 bar absolute');
        var fiN2 = 0.79;
        var fiO2 = 0.21;

        var ppN2 = Math.round(dive.partialPressure(barAbs, fiN2) * 100) / 100;
        var ppO2 = Math.round(dive.partialPressure(barAbs, fiO2) * 100) / 100;

        test.equals(ppN2, 1.59, '10 meters below with 79% nitrogen should make nitrogen at ~1.59 bar absolute');
        test.equals(ppO2, 0.42, '10 meters below with 21% nitrogen should make oxygen at 0.42 bar absolute');
        test.done();
    }
};

exports['partialPressureAtDepth'] = {
    setUp: function(done) {
        done();
    },
    'partial pressure in bar absolute for gas volume fraction': function(test) {
        test.expect(2);
        // diving with a tank that has 79% nitrogen and 21% oxygen
        // to 10 meters below sea level (or approximately 2 bar absolute)

        var fiN2 = 0.79;
        var fiO2 = 0.21;

        var ppN2 = Math.round(dive.partialPressureAtDepth(10, fiN2) * 100) / 100;
        var ppO2 = Math.round(dive.partialPressureAtDepth(10, fiO2) * 100) / 100;

        test.equals(ppN2, 1.59, '10 meters below with 79% nitrogen should make nitrogen at ~1.59 bar absolute');
        test.equals(ppO2, 0.42, '10 meters below with 21% nitrogen should make oxygen at 0.42 bar absolute');
        test.done();
    },
    'partial pressure in bar absolute for gas volume fraction in fresh': function(test) {
        test.expect(2);
        // diving with a tank that has 79% nitrogen and 21% oxygen
        // to 10 meters below sea level (or approximately 2 bar absolute)

        var fiN2 = 0.79;
        var fiO2 = 0.21;

        var ppN2 = Math.round(dive.partialPressureAtDepth(10, fiN2, true) * 100) / 100;
        var ppO2 = Math.round(dive.partialPressureAtDepth(10, fiO2, true) * 100) / 100;

        test.equals(ppN2, 1.56, '10 meters below with 79% nitrogen should make nitrogen at ~1.56 bar absolute in fresh water');
        test.equals(ppO2, 0.42, '10 meters below with 21% nitrogen should make oxygen at 0.42 bar absolute in fresh water');
        test.done();
    }
};

exports['mmHgToPascal'] = {
    setUp: function(done) {
        done();
    },
    'no args': function(test) {
        test.expect(1);
        var pascal = Math.round(dive.mmHgToPascal());
        test.equals(pascal, 133, '1 mmhg should equal about 133 pascal');
        test.done();
    },
    '1 arg': function(test) {
        test.expect(1);
        var pascal = Math.round(dive.mmHgToPascal(2));
        test.equals(pascal, 267, '2 mmhg should equal about 267 pascal');
        test.done();
    }
};

exports['waterVapourPressure'] = {
    setUp: function(done) {
        done();
    },
    'approximate pressure in lungs': function(test) {
        test.expect(2);
        var degreesCelcius = 35.2;
        var mmHg = dive.waterVapourPressure(degreesCelcius);
        test.equals(Math.round(mmHg), 43, '35.2 degrees celcius should put water vapour pressure at about 43 mmhg');
        var pascals = dive.mmHgToPascal(mmHg);
        var bars = dive.pascalToBar(pascals);
        test.equals((Math.round(bars * 10000) / 10000), 0.0567, 'approximate water vapour pressure in the lungs should be about 0.0537 bars');
        test.done();
    }
};

exports['waterVapourPressureInBars'] = {
    setUp: function(done) {
        done();
    },
    'approximate pressure in lungs': function(test) {
        test.expect(1);
        var degreesCelcius = 35.2;
        var bars = dive.waterVapourPressureInBars(degreesCelcius);
        test.equals((Math.round(bars * 10000) / 10000), 0.0567, 'approximate water vapour pressure in the lungs should be about 0.0537 bars');
        test.done();
    }
};

exports['maxOperatingDepth'] = {
    setUp: function(done) {
        done();
    },
    'salt water - max depth 1.4 bar with 21% O2': function(test) {
        test.expect(1);
        var meters = dive.maxOperatingDepth(1.4, 0.21);
        test.equals(Math.round(meters), 56, '1.4 bars at 21% oxygen should allow for about 56m MOD in salt water');
        test.done();
    },
    'fresh water - max depth 1.4 bar with 21% O2': function(test) {
        test.expect(1);
        var meters = dive.maxOperatingDepth(1.4, 0.21, true);
        test.equals(Math.round(meters), 58, '1.4 bars at 21% oxygen should allow for about 58m MOD in fresh water');
        test.done();
    }
};

exports['equivNarcoticDepth'] = {
    setUp: function(done) {
        done();
    },
    'salt water - equivalent narcotic depth 12% O2, 38% N2, 50% He at 100m': function(test) {
        test.expect(1);
        var meters = dive.equivNarcoticDepth(0.12,0.38,0.50,100);
        test.equals(Math.round(meters), 57, '12% O2/38% N2/50% He should have the same narcotic depth on air at x meters in salt water');
        test.done();
    },
    'fresh water - equivalent narcotic depth 12% O2, 38% N2, 50% He at 100m': function(test) {
        test.expect(1);
        var meters = dive.equivNarcoticDepth(0.12,0.38,0.50,100,true);
        test.equals(Math.round(meters), 57, '12% O2/38% N2/50% He should have the same narcotic depth on air at x meters in fresh water');
        test.done();
    },
};

exports['instantaneousEquation'] = {
    setUp: function(done) {
        done();
    },
    'simple instant pressure calculation': function(test) {
        test.expect(2);
        var ppNitrogen = dive.partialPressure(1, 0.79) - dive.waterVapourPressureInBars();
        test.equals(Math.round(ppNitrogen * 10000) / 10000, 0.7887, 'Initial partial pressure of nitrogen minus water vapour should be 0.7887');
        var fN2 = 0.79;
        var ppGas = (dive.depthInMetersToBars(20) - 1 - dive.waterVapourPressureInBars()) * fN2;
        var newPPNitrogen = dive.instantaneousEquation(ppNitrogen, ppGas, 40, 4.0);
        test.equals(Math.round(newPPNitrogen * 100) / 100, 1.59, 'Exposed to regular air for 40 minutes at 20 meters should put pp nitrogen at 1.59');
        test.done();
    }
};

exports['depthChangeInBarsPerMinute'] = {
    setUp: function(done) {
        done();
    },
    '0 to 10 meters in 30 seconds in salt water': function(test) {
        test.expect(1);
        var barsPerMinute = dive.depthChangeInBarsPerMinute(0, 10, 0.5);
        test.equals(barsPerMinute, 2.0201699, '0 to 10 meters in 30 seconds should be about 2 bars per minute.');
        test.done();
    },
    '0 to 10 meters in 30 seconds in fresh water': function(test) {
        test.expect(1);
        var barsPerMinute = dive.depthChangeInBarsPerMinute(0, 10, 0.5, true);
        test.equals(barsPerMinute, 1.9613300000000002, '0 to 10 meters in 30 seconds in fresh water should be about 1.9 bars per minute.');
        test.done();
    }
};

exports['gasRateInBarsPerMinute'] = {
    setUp: function(done) {
        done();
    },
    '0 to 10 meters in 30 seconds in salt water for 79% N2': function(test) {
        test.expect(1);
        var barsPerMinute = dive.gasRateInBarsPerMinute(0, 10, 0.5, 0.79);
        test.equals(barsPerMinute, 1.595934221, '0 to 10 meters in 30 seconds should be about 1.6 bars per minute for 79% N2.');
        test.done();
    },
    '0 to 10 meters in 30 seconds in fresh water for 79% N2': function(test) {
        test.expect(1);
        var barsPerMinute = dive.gasRateInBarsPerMinute(0, 10, 0.5, 0.79, true);
        test.equals(barsPerMinute, 1.5494507000000002, '0 to 10 meters in 30 seconds in fresh water should be about 1.5 bars per minute for 79% N2.');
        test.done();
    }
};

exports['gasPressureBreathingInBars'] = {
    setUp: function(done) {
        done();
    },
    'breathing 79% N2 at 10 meters in salt water': function(test) {
        test.expect(2);
        var waterVapourPressure = dive.constants.vapourPressure.lungsBreathing.current();
        test.equals(Math.round(waterVapourPressure * 10000) / 10000, 0.0567, 'water vapour pressure in the lungs should be about 0.0567 bars');
        var bars = dive.gasPressureBreathingInBars(10, 0.79);
        test.equals(Math.round(bars * 1000) / 1000, 1.588, 'breathing 79% N2 at 10 meters in salt water should be about 1.588 bars (remember to add 1 bar for the surface)');
        test.done();
    },
    'breathing 79% N2 at 10 meters in fresh water': function(test) {
        test.expect(2);
        var waterVapourPressure = dive.constants.vapourPressure.lungsBreathing.current();
        test.equals(Math.round(waterVapourPressure * 10000) / 10000, 0.0567, 'water vapour pressure in the lungs should be about 0.0567 bars');
        var bars = dive.gasPressureBreathingInBars(10, 0.79, true);
        test.equals(Math.round(bars * 100) / 100, 1.56, 'breathing 79% N2 at 10 meters in fresh water should be about 1.56 bars (remember to add 1 bar for the surface)');
        test.done();
    }
};


exports['gasses'] = {
    setUp: function (done) {
        done();
    },

    'gas mod': function (test) {
        test.expect(4);
        var gasAir = dive.gas(0.21, 0.0);
        var gas2135 = dive.gas(0.21, 0.35);
        var gas50 = dive.gas(0.5, 0.0);
        var gas100 = dive.gas(1.0, 0.0);

        test.equals(57, Math.round(gasAir.modInMeters(1.4)), 'MOD of air is close to 60 meters.');
        test.equals(47, Math.round(gas2135.modInMeters(1.2)), 'MOD of 21/35 is 60 meters.');
        test.equals(22, Math.round(gas50.modInMeters(1.6)), 'MOD of 50% is close to 21 meters.');
        test.equals(6, Math.round(gas100.modInMeters(1.6)), 'MOD of 100% is close to 6 meters.');
        test.done();
    },

    'gas end': function (test) {
        test.expect(2);
        var gasAir = dive.gas(0.21, 0.0);
        var gas2135 = dive.gas(0.21, 0.35);

        test.equals(100, Math.round(gasAir.endInMeters(100)), 'END of air is close to 100 meters.');
        test.equals(62, Math.round(gas2135.endInMeters(100)), 'END of 21/35 is 62 meters.');
        test.done();
    },

    'gas reverse end': function (test) {
        test.expect(3);
        var gasAir = dive.gas(0.21, 0.0);
        var gas2135 = dive.gas(0.21, 0.35);

        test.equals(100, Math.round(gasAir.depthFromEndInMeters(100)), 'Depth on air to get 100 meters END, is 100 meters');
        test.equals(101, Math.round(gas2135.depthFromEndInMeters(62)), 'Depth on 21/35 to get 62 meters END is 100 meters.');
        test.equals(159, Math.round(gas2135.depthFromEndInMeters(100)), 'Depth on 21/35 to get 100 meters END is 100 meters.');
        test.done();
    },

}

exports['buhlmannequations'] = {
    setUp: function(done) {
        done();
    },
    'instantaneous buhlmann equation': function (test) {
        test.expect(165);
        var buhlmann = dive.deco.buhlmann();
        for (var halfTime = 1; halfTime < 16; halfTime++) {
            //Load tissue from 0 previous load of this gas,
            // to 7 bar depth (60 meters) times inert gas percentage (0.79)
            // for 1 minute time
            // for a tissue with half-time of 1 minute
            var prevLoad = 10000;
            var prevLoadChange = 100;
            for (var time = 1; time <= 10; time++) {
                var load = dive.instantaneousEquation(0, 7 * 0.79, time, halfTime);
                var loadChange = load - prevLoad;
                test.ok(true, loadChange < prevLoadChange, 'over time, the change in tissue load must decrease.');
                //console.log("Tissue (halfTime:" + halfTime + ", Time:" + time + ") load-> " + load);
                prevLoad = load;
                prevLoadChange = loadChange;
            }
        }

        var prevLoad = 10000;
        var prevLoadChange = 100;
        for (var halfTime = 1; halfTime < 16; halfTime++) {
            //Load tissue from 0 previous load of this gas,
            // to 7 bar depth (60 meters) times inert gas percentage (0.79)
            // for 1 minute time
            // for a tissue with half-time of 1 minute
            var load = dive.instantaneousEquation(0, 7 * 0.79, 10, halfTime);
            var loadChange = load - prevLoad;
            test.ok(true, loadChange < prevLoadChange, 'over increasing half-lives, the change in tissue load must decrease for constant time.');
            //console.log("Tissue (halfTime:" + halfTime + ", Time:" + time + ") load-> " + load);
            prevLoad = load;
            prevLoadChange = loadChange;
        }
        test.done();
    },

    'schreiner buhlmann equation': function (test) {
        test.expect(165);
        var buhlmann = dive.deco.buhlmann();
        for (var halfTime = 1; halfTime < 16; halfTime++) {
            //Load tissue from 0 previous load of this gas,
            // to 7 bar depth (60 meters) times inert gas percentage (0.79)
            // for 1 minute time
            // for a tissue with half-time of 1 minute
            var prevLoad = 0;
            for (var time = 1; time <= 10; time++) {
                var load = dive.schreinerEquation(1, time, Math.log(2)/halfTime, 7 * 0.79, 0);
                test.ok(load > prevLoad, 'over time, the tissue load must decrease for a constant half-life and depth.');
                if (load <= prevLoad) {
                    console.log("Tissue (halfTime:" + halfTime + ", Time:" + time + ") load-> " + load);
                }
                prevLoad = load;
            }
        }

        var prevLoad = 10000;
        for (var halfTime = 1; halfTime < 16; halfTime++) {
            //Load tissue from 0 previous load of this gas,
            // to 7 bar depth (60 meters) times inert gas percentage (0.79)
            // for 1 minute time
            // for a tissue with half-time of 1 minute
            var load = dive.schreinerEquation(1, 10, Math.log(2)/halfTime, 7 * 0.79, 0);
            test.ok(load < prevLoad, 'over increasing half-lives, the tissue load must decrease for constant time.');
            if (load >= prevLoad) {
                console.log("Tissue (halfTime:" + halfTime + ", Time:" + time + ") load-> " + load);
            }
            prevLoad = load;
        }
        test.done();
    },


     'comparison of slope loading vs flat loading': function (test) {
        test.expect(150);
        var buhlmann = dive.deco.buhlmann();
        var targetGasPressure = 7 * 0.79;
        for (var halfTime = 1; halfTime < 16; halfTime++) {
            //Load tissue from 0 previous load of this gas,
            // to 7 bar depth (60 meters) times inert gas percentage (0.79)
            // for 1 minute time
            // for a tissue with half-time of 1 minute
            for (var time = 1; time <= 10; time++) {
                var gasRate = targetGasPressure/time;
                var slopeLoad = dive.schreinerEquation(0, 0, time, halfTime, gasRate);
                var flatLoad = dive.instantaneousEquation(0, targetGasPressure, time, halfTime)
                test.ok(slopeLoad < flatLoad, 'for any depth, the load going down a slope, should be far lower than spending all time at that depth');
                //console.log("Tissue (halfTime:" + halfTime + ", Time:" + time + ", GasRate: "+gasRate+") slope load-> " + slopeLoad + "  flatLoad->" + flatLoad);
            }
        }
        test.done();
    },

    'instantaneous equation is shreiner equation with rate zero': function (test) {
        test.expect(150);
        var buhlmann = dive.deco.buhlmann();
        var targetGasPressure = 7 * 0.79;
        for (var halfTime = 1; halfTime < 16; halfTime++) {
            //Load tissue from 0 previous load of this gas,
            // to 7 bar depth (60 meters) times inert gas percentage (0.79)
            // for 1 minute time
            // for a tissue with half-time of 1 minute
            for (var time = 1; time <= 10; time++) {
                var gasRate = targetGasPressure/time;
                var slopeLoad = dive.schreinerEquation(0, targetGasPressure, time, halfTime, 0);
                var flatLoad = dive.instantaneousEquation(0, targetGasPressure, time, halfTime)
                var diff = Math.abs(slopeLoad-flatLoad)
                test.ok(diff <= 0.0000001, 'the load from slope equation should be identical to load from flat equation, when slope == 0');
                //console.log("Tissue (halfTime:" + halfTime + ", Time:" + time + ", GasRate: "+gasRate+") slope load-> " + slopeLoad + "  flatLoad->" + flatLoad);
            }
        }
        test.done();
    }
};


exports['buhlmannplan'] = {
    setUp: function(done) {
        done();
    },

    'simple depth change analysis': function (test) {
        test.expect(1);
        var buhlmann = dive.deco.buhlmann();
        var newPlan = new buhlmann.plan(buhlmann.ZH16ATissues);
        newPlan.addDepthChange(0, 25, 0.21, 0.0, 2);
        newPlan.addFlat(25, 0.21, 0.0, 20);
        newPlan.addDepthChange(25, 35, 0.21, 0.0, 2);
        newPlan.addFlat(35, 0.21, 0.0, 15);
        test.equals(3, newPlan.getCeiling(1.5), 'given the various depth changes, the ceiling should be at 3 meters in fresh water');
        test.done();
    },

    'ndl rule of 130 for 32 percent': function (test) {
        test.expect(0);
        var buhlmann = dive.deco.buhlmann();
        var newPlan = new buhlmann.plan(buhlmann.ZH16BTissues);
        var gradientFactor = 1.5; //This was choosen to closely match PADI dive tables.
        //console.log("Ceiling:" + newPlan.getCeiling(30, 0.21, 0.0, 0.8));
        for (var i=100; i > 50; i-=10) {
            var ndlTime = newPlan.ndl(dive.feetToMeters(i), 0.32, 0.0, gradientFactor);
            var closeTo130 = ndlTime + i;
            console.log("Depth:" + i + " Time:" + ndlTime + " Total:" + closeTo130);
        }
        test.done();
    },

    'ndl for air': function (test) {
        //Compare PADI DSAT table for reference:http://www.divetalking.com/wp-content/uploads/2009/11/AIR-RDP1.jpg
        test.expect(12);
        var buhlmann = dive.deco.buhlmann();
        var newPlan = new buhlmann.plan(buhlmann.ZH16BTissues);
        var gradientFactor = 1.5; //This was choosen to closely match PADI dive tables.
        //console.log("Ceiling:" + newPlan.getCeiling(30, 0.21, 0.0, 0.8));
        test.equals(8, newPlan.ndl(dive.feetToMeters(140), 0.21, 0.0, gradientFactor), "NDL for 140 feet should be close to 7 minutes");
        test.equals(9, newPlan.ndl(dive.feetToMeters(130), 0.21, 0.0, gradientFactor), "NDL for 130 feet should be close to  9 minutes");
        test.equals(10, newPlan.ndl(dive.feetToMeters(120), 0.21, 0.0, gradientFactor), "NDL for 120 feet should be close to 12 minutes");
        test.equals(12, newPlan.ndl(dive.feetToMeters(110), 0.21, 0.0, gradientFactor), "NDL for 110 feet should be close to 15 minutes");
        test.equals(15, newPlan.ndl(dive.feetToMeters(100), 0.21, 0.0, gradientFactor), "NDL for 100 feet should be close to 19 minutes");
        test.equals(18, newPlan.ndl(dive.feetToMeters(90), 0.21, 0.0, gradientFactor), "NDL for 90 feet should be close to 24 minutes");
        test.equals(24, newPlan.ndl(dive.feetToMeters(80), 0.21, 0.0, gradientFactor), "NDL for 80 feet should be close to 29 minutes");
        test.equals(33, newPlan.ndl(dive.feetToMeters(70), 0.21, 0.0, gradientFactor), "NDL for 70 feet should be close to 38 minutes");
        test.equals(45, newPlan.ndl(dive.feetToMeters(60), 0.21, 0.0, gradientFactor), "NDL for 60 feet should be close to 54 minutes");
        test.equals(67, newPlan.ndl(dive.feetToMeters(50), 0.21, 0.0, gradientFactor), "NDL for 50 feet should be close to 75 minutes");
        test.equals(120, newPlan.ndl(dive.feetToMeters(40), 0.21, 0.0, gradientFactor), "NDL for 40 feet should be close to 129 minutes");
        test.equals(179, newPlan.ndl(dive.feetToMeters(35), 0.21, 0.0, gradientFactor), "NDL for 35 feet should be close to 188 minutes");
        test.done();
    }
};
