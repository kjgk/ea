/**
 * Grid theme for Highcharts JS
 * @author Torstein Hønsi
 */

Highcharts.theme = {
	colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
	chart: {
        borderRadius: 0,
        spacingTop: 15,
        spacingLeft: 15,
        spacingRight: 25,
        spacingBottom: 25,
        backgroundColor: '#F2F2F2'
	},
	title: {
		style: {
			color: '#000',
			font: 'bold 16px Microsoft YaHei'
		}
	},
	subtitle: {
		style: {
			color: '#666666',
			font: 'bold 12px Microsoft YaHei'
		}
	},
	xAxis: {
		gridLineWidth: 1,
		lineColor: '#000',
		tickColor: '#000',
		labels: {
			style: {
				color: '#000',
				font: '11px Microsoft YaHei'
			}
		},
		title: {
			style: {
				color: '#333',
				fontWeight: 'bold',
				fontSize: '12px',
				fontFamily: 'Microsoft YaHei'

			}
		}
	},
	yAxis: {
		minorTickInterval: 'auto',
		lineColor: '#000',
		lineWidth: 1,
		tickWidth: 1,
		tickColor: '#000',
		labels: {
			style: {
				color: '#000',
				font: '11px Microsoft YaHei'
			}
		},
		title: {
			style: {
				color: '#333',
				fontWeight: 'bold',
				fontSize: '12px',
				fontFamily: 'Microsoft YaHei'
			}
		}
	},
	legend: {
		itemStyle: {
			font: '9pt Microsoft YaHei',
			color: 'black'

		},
		itemHoverStyle: {
			color: '#039'
		},
		itemHiddenStyle: {
			color: 'gray'
		}
	},
	labels: {
		style: {
			color: '#99b'
		}
	},

	navigation: {
		buttonOptions: {
			theme: {
				stroke: '#CCCCCC'
			}
		}
	}
};

// Apply the theme
var highchartsOptions = Highcharts.setOptions(Highcharts.theme)

Highcharts.setOptions({
    lang: {
        numericSymbols: null
    },
    credits: {
        enabled: false
    }
});
