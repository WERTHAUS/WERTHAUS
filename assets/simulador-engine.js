(function (global) {
  'use strict';

  const CONFIG = Object.freeze({
    updatedAt: '2026-08-20',
    areaEquivalentFactor: 0.935,

    cub: Object.freeze({
      referenceMonth: '2026-07',
      normalR1N: 3082.77,
      highR1A: 3824.03,
      premiumFactor: 1.30
    }),

    wall: Object.freeze({
      baseCostPerM2: 300,
      heightM: 2,
      referenceMonth: '2026-07',
      inccBaseIndex: 1283.035,
      inccCurrentMonth: '2026-07',
      inccCurrentIndex: 1283.035
    }),

    vau: Object.freeze({
      referenceMonth: '2026-08',
      residentialSingleFamilyMG: 3058.04
    }),

    typology: Object.freeze({
      undecided: Object.freeze({ factor: 1.00, seroType: 'masonry', label: 'Ainda não definido' }),
      structuralMasonry: Object.freeze({ factor: 0.88, seroType: 'masonry', label: 'Alvenaria estrutural' }),
      conventionalConcrete: Object.freeze({ factor: 1.00, seroType: 'masonry', label: 'Estrutura de concreto convencional' }),
      ecologicalBrick: Object.freeze({ factor: 0.94, seroType: 'masonry', label: 'Tijolo ecológico' }),
      steel: Object.freeze({ factor: 1.15, seroType: 'mixed', label: 'Estrutura metálica' }),
      steelEcologicalBrick: Object.freeze({ factor: 1.08, seroType: 'mixed', label: 'Estrutura metálica + tijolo ecológico' })
    }),

    topography: Object.freeze({
      flat: Object.freeze({ factor: 1.00, label: 'Plano' }),
      lightUphill: Object.freeze({ factor: 1.02, label: 'Leve aclive' }),
      lightDownhill: Object.freeze({ factor: 1.02, label: 'Leve declive' }),
      steepUphill: Object.freeze({ factor: 1.15, label: 'Aclive acentuado' }),
      steepDownhill: Object.freeze({ factor: 1.10, label: 'Declive acentuado' })
    }),

    standards: Object.freeze({
      normal: Object.freeze({ label: 'Normal', cubKey: 'normalR1N', factor: 1.00, lowFactor: 0.90, highFactor: 1.10, distribution: 'normal' }),
      high: Object.freeze({ label: 'Alto padrão', cubKey: 'highR1A', factor: 1.00, lowFactor: 0.90, highFactor: 1.10, distribution: 'high' }),
      premium: Object.freeze({ label: 'Premium / autoral', cubKey: 'highR1A', factor: 1.30, lowFactor: 0.90, highFactor: 1.20, distribution: 'high' })
    }),

    otherServicesRate: 0.05,

    administration: Object.freeze([
      Object.freeze({ from: 500000, rate: 0.18 }),
      Object.freeze({ from: 600000, rate: 0.17 }),
      Object.freeze({ from: 700000, rate: 0.16 }),
      Object.freeze({ from: 800000, rate: 0.15 }),
      Object.freeze({ from: 900000, rate: 0.145 }),
      Object.freeze({ from: 1000000, rate: 0.14 }),
      Object.freeze({ from: 1250000, rate: 0.13 }),
      Object.freeze({ from: 1500000, rate: 0.12 }),
      Object.freeze({ from: 2000000, rate: 0.11 }),
      Object.freeze({ from: 2500000, rate: 0.10 }),
      Object.freeze({ from: 3000000, rate: 0.09 })
    ]),

    durationMonths: Object.freeze([
      Object.freeze({ value: 500000, months: 12 }),
      Object.freeze({ value: 600000, months: 13 }),
      Object.freeze({ value: 700000, months: 14 }),
      Object.freeze({ value: 800000, months: 15 }),
      Object.freeze({ value: 900000, months: 16 }),
      Object.freeze({ value: 1000000, months: 17 }),
      Object.freeze({ value: 1250000, months: 19 }),
      Object.freeze({ value: 1500000, months: 22 }),
      Object.freeze({ value: 2000000, months: 24 }),
      Object.freeze({ value: 2500000, months: 27 }),
      Object.freeze({ value: 3000000, months: 30 })
    ]),

    stageDistribution: Object.freeze({
      normal: Object.freeze([
        Object.freeze({ key: 'foundation', label: 'Fundação', percent: 6.91 }),
        Object.freeze({ key: 'structureWalls', label: 'Estrutura e vedações', percent: 19.44 }),
        Object.freeze({ key: 'roof', label: 'Cobertura', percent: 9.96 }),
        Object.freeze({ key: 'coatingsFloors', label: 'Revestimentos e pisos', percent: 16.61 }),
        Object.freeze({ key: 'framesGlass', label: 'Esquadrias e vidros', percent: 6.81 }),
        Object.freeze({ key: 'installations', label: 'Instalações', percent: 8.54 }),
        Object.freeze({ key: 'finishes', label: 'Acabamentos finais', percent: 20.73 }),
        Object.freeze({ key: 'external', label: 'Áreas externas', percent: 11.00 })
      ]),
      high: Object.freeze([
        Object.freeze({ key: 'foundation', label: 'Fundação', percent: 6.12 }),
        Object.freeze({ key: 'structureWalls', label: 'Estrutura e vedações', percent: 17.21 }),
        Object.freeze({ key: 'roof', label: 'Cobertura', percent: 8.82 }),
        Object.freeze({ key: 'coatingsFloors', label: 'Revestimentos e pisos', percent: 17.33 }),
        Object.freeze({ key: 'framesGlass', label: 'Esquadrias e vidros', percent: 11.86 }),
        Object.freeze({ key: 'installations', label: 'Instalações', percent: 8.89 }),
        Object.freeze({ key: 'finishes', label: 'Acabamentos finais', percent: 20.02 }),
        Object.freeze({ key: 'external', label: 'Áreas externas', percent: 9.75 })
      ])
    }),

    sero: Object.freeze({
      equivalentAreaUntil1000: 0.89,
      equivalentAreaAbove1000: 0.85,
      laborShareMasonry: 0.20,
      laborShareMixed: 0.15,
      contributionRate: 0.368
    })
  });

  function assertFinitePositive(value, field) {
    const numeric = Number(value);
    if (!Number.isFinite(numeric) || numeric <= 0) throw new Error(`${field} deve ser um número positivo.`);
    return numeric;
  }

  function socialFactor(areaM2) {
    if (areaM2 <= 100) return 0.20;
    if (areaM2 <= 200) return 0.40;
    if (areaM2 <= 300) return 0.55;
    if (areaM2 <= 400) return 0.70;
    return 0.90;
  }

  function administrationRate(valueBeforeAdministration) {
    let rate = CONFIG.administration[0].rate;
    for (const item of CONFIG.administration) if (valueBeforeAdministration >= item.from) rate = item.rate;
    return rate;
  }

  function durationForValue(totalValue) {
    const table = CONFIG.durationMonths;
    if (totalValue <= table[0].value) return table[0].months;
    if (totalValue >= table[table.length - 1].value) return table[table.length - 1].months;
    for (let i = 0; i < table.length - 1; i += 1) {
      const a = table[i], b = table[i + 1];
      if (totalValue >= a.value && totalValue <= b.value) {
        const position = (totalValue - a.value) / (b.value - a.value);
        return Math.round(a.months + position * (b.months - a.months));
      }
    }
    return table[table.length - 1].months;
  }

  function estimatedWallArea(terrainAreaM2) {
    const frontage = Math.sqrt(terrainAreaM2 / 2);
    const closedLength = 5 * frontage;
    return closedLength * CONFIG.wall.heightM;
  }

  function adjustedWallCostPerM2() {
    return CONFIG.wall.baseCostPerM2 * (CONFIG.wall.inccCurrentIndex / CONFIG.wall.inccBaseIndex);
  }

  function estimateSero(builtAreaM2, typologyKey) {
    const typology = CONFIG.typology[typologyKey] || CONFIG.typology.undecided;
    const equivalentAreaFactor = builtAreaM2 <= 1000 ? CONFIG.sero.equivalentAreaUntil1000 : CONFIG.sero.equivalentAreaAbove1000;
    const equivalentArea = builtAreaM2 * equivalentAreaFactor;
    const cod = equivalentArea * CONFIG.vau.residentialSingleFamilyMG;
    const laborShare = typology.seroType === 'mixed' ? CONFIG.sero.laborShareMixed : CONFIG.sero.laborShareMasonry;
    const rmtBeforeSocialFactor = cod * laborShare;
    const factor = socialFactor(builtAreaM2);
    const rmt = rmtBeforeSocialFactor * factor;
    const estimatedContribution = rmt * CONFIG.sero.contributionRate;
    return { equivalentArea, cod, laborShare, socialFactor: factor, rmtBeforeSocialFactor, rmt, estimatedContribution };
  }

  function stageBreakdown(totalCentral, distributionKey) {
    const rows = CONFIG.stageDistribution[distributionKey] || CONFIG.stageDistribution.high;
    return rows.map((row) => ({ key: row.key, label: row.label, percent: row.percent, value: totalCentral * (row.percent / 100) }));
  }

  function estimate(input) {
    const terrainAreaM2 = assertFinitePositive(input.terrainAreaM2, 'Área do terreno');
    const builtAreaM2 = assertFinitePositive(input.builtAreaM2, 'Área construída');
    const standardKey = input.standardKey;
    const typologyKey = input.typologyKey || 'undecided';
    const topographyKey = input.topographyKey;
    const standard = CONFIG.standards[standardKey];
    const typology = CONFIG.typology[typologyKey];
    const topography = CONFIG.topography[topographyKey];
    if (!standard) throw new Error('Padrão de projeto inválido.');
    if (!typology) throw new Error('Tipologia inválida.');
    if (!topography) throw new Error('Topografia inválida.');

    const equivalentAreaM2 = builtAreaM2 * CONFIG.areaEquivalentFactor;
    const cubUnit = CONFIG.cub[standard.cubKey] * standard.factor;
    const cubAdjustedCost = equivalentAreaM2 * cubUnit * typology.factor * topography.factor;
    const wallAreaM2 = estimatedWallArea(terrainAreaM2);
    const wallCostPerM2 = adjustedWallCostPerM2();
    const wallCost = wallAreaM2 * wallCostPerM2;
    const sero = estimateSero(builtAreaM2, typologyKey);
    const otherServices = (cubAdjustedCost + wallCost) * CONFIG.otherServicesRate;
    const valueBeforeAdministration = cubAdjustedCost + wallCost + sero.estimatedContribution + otherServices;
    const adminRate = administrationRate(valueBeforeAdministration);
    const administrationCost = valueBeforeAdministration * adminRate;
    const totalCentral = valueBeforeAdministration + administrationCost;
    const low = totalCentral * standard.lowFactor;
    const high = totalCentral * standard.highFactor;
    const durationMonths = durationForValue(totalCentral);
    const stages = stageBreakdown(totalCentral, standard.distribution);

    return {
      input: { terrainAreaM2, builtAreaM2, standardKey, typologyKey, topographyKey },
      public: {
        standardLabel: standard.label,
        typologyLabel: typology.label,
        topographyLabel: topography.label,
        low, high, central: totalCentral,
        lowPerM2: low / builtAreaM2,
        highPerM2: high / builtAreaM2,
        centralPerM2: totalCentral / builtAreaM2,
        durationMonths,
        stages,
        reference: { cubMonth: CONFIG.cub.referenceMonth, vauMonth: CONFIG.vau.referenceMonth, inccMonth: CONFIG.wall.inccCurrentMonth, configUpdatedAt: CONFIG.updatedAt }
      },
      _calculation: {
        equivalentAreaM2, cubUnit, typologyFactor: typology.factor, topographyFactor: topography.factor, cubAdjustedCost,
        wallAreaM2, wallCostPerM2, wallCost, sero, otherServices, valueBeforeAdministration, adminRate, administrationCost, totalCentral
      }
    };
  }

  function roundMoney(value, step) { return Math.round(value / step) * step; }

  global.WerthausEstimator = Object.freeze({
    CONFIG,
    estimate,
    helpers: Object.freeze({ administrationRate, durationForValue, estimatedWallArea, adjustedWallCostPerM2, estimateSero, socialFactor, stageBreakdown, roundMoney })
  });
})(window);
